import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Task } from '../Models/Task';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private http: HttpClient) {}
  currTaskID: number = 0;
  tasks: Task[] = [];

  initializeTasks(): void {
    let currDate = new Date();
    this.tasks.push(new Task(this.currTaskID++, "Mow Lawn", "The HOA is sending me subtle death threats", new Date(currDate.setDate(currDate.getDate() + 2)), "Personal"));
    this.tasks.push(new Task(this.currTaskID++, "Ask for raise", "Call me SENIOR Vice Lion Tamer", new Date(currDate.setDate(currDate.getDate() + 5)), "Work"));
    this.tasks.push(new Task(this.currTaskID++, "Buy Peas", "Making shepherds pie and feeding several ducks", new Date(), "Urgent"));
    this.tasks.push(new Task(this.currTaskID++, "Complete Task List", "Make Angular task list in ~2 hrs", new Date(currDate.setDate(currDate.getDate() + 3)), "Work"));
    this.tasks.push(new Task(this.currTaskID++, "Pet all dogs", "Pet every dog I see", new Date(currDate.setDate(currDate.getDate() + 17)), "Personal"));
  }

  getTasks(): Observable<Array<Task>> {
    // spoofed API call
    this.initializeTasks();
    return of(this.tasks).pipe(delay(1000));
  }
}