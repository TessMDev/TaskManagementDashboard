import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Task } from './Models/Task';
import { Category } from './Models/Category';
import { DatePipe, AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './Components/task-dialog/task-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StoreModule, Store } from '@ngrx/store';
import { TasksActions, TasksApiActions } from './state/tasks.actions';
import { TasksService } from './state/tasks.service';
import { Observable } from 'rxjs';
import { selectVisibleTasks } from './state/tasks.selectors';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    DatePipe,
    AsyncPipe,
    StoreModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  tasks: Task[] = [];
  currTaskID = 5;
  orderByDueDate: boolean = false;
  categories: Category[] = [
    {id: 1, title: "Work", visible: true},
    {id: 2, title: "Personal", visible: true},
    {id: 3, title: "Urgent", visible: true}
  ];
  readonly dialog = inject(MatDialog);
  tasks$: Observable<Task[]> = new Observable<Task[]>();


  constructor(private store: Store<{tasks: Task[], taskCollection: Task[]}>, private tasksService: TasksService) {}

  ngOnInit() {
    // Fetch Tasks from the fake API
    this.tasksService.getTasks().subscribe((tasks) => 
      this.store.dispatch(TasksApiActions.retrievedTasksList({tasks}))
    );

    // get the initial tasks from the store
    this.getFilteredTasks();
  }

  getFilteredTasks(): void {
    this.tasks$ = this.store.select(selectVisibleTasks(this.flattenCategories(), this.orderByDueDate));
  }

  calculateIcon(category: string): string {
    switch(category) {
      case "Personal":
        return "person";
      case "Work":
        return "domain";
      case "Urgent":
        return "warning";
      default :
        return "person";
    }
  }

  openTaskEditDialog(task?: Task): void {
    // If we aren't editing a task, create a new blank one
    // If we ARE editing, create a copy of the one we were passed to work on
    let dialogTask: Task = task == undefined ? new Task() : {...task};
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {task: dialogTask},
    });

    // Dialog window closed
    dialogRef.afterClosed().subscribe(result => {
      // If user saved...
      if (result != undefined) {
        console.log('task ID: ' + task?.id);
        if (task !== undefined) {
          // Update Task
          this.store.dispatch(TasksActions.updateTask({taskId: dialogTask.id, task: new Task(dialogTask.id, result.title, result.description, result.dueDate, result.category)}));
        }
        else {
          // New Task
          this.store.dispatch(TasksActions.addTask({task: new Task(this.currTaskID++, result.title, result.description, result.dueDate, result.category)}));
        }
      }
    });
  }

  removeTask(taskId: number) {
    console.log('Removing task ' + taskId)
    this.store.dispatch(TasksActions.removeTask({taskId}));
  }

  flattenCategories(): string[] {
    return this.categories.filter((cat) => cat.visible).map((cat) => cat.title);
  }
}
