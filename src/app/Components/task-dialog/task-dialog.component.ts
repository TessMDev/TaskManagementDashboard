import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../../Models/Task';

export interface DialogData {
  task: Task;
}

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<TaskDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly task = model(this.data.task);
  isEditMode: boolean = this.data.task.title.length > 0;
  formError: boolean = false;

  ngOnInit() {
    this.setInitialCatValue();
  }
  
  setInitialCatValue() {
    if (this.data.task.category.length == 0) {
      this.data.task.category = "Personal";
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
