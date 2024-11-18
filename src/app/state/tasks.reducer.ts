import { createReducer, on } from '@ngrx/store';
import { TasksApiActions } from './tasks.actions';
import { TasksActions } from './tasks.actions';
import { Task } from '../Models/Task';

export const initialState: ReadonlyArray<Task> = [];
export const initialCategoryState: ReadonlyArray<string> = [];

export const tasksReducer = createReducer(
  initialState,
  
  // Getting initial Tasks from API
  on(TasksApiActions.retrievedTasksList, (_state, { tasks }) => tasks),

  // Remove Task
  on(TasksActions.removeTask, (state, { taskId }) =>
    state.filter((task) => task.id !== taskId)
  ),

  // Add New Task
  on(TasksActions.addTask, (state, { task }) => {
    return [...state, task];
  }),

  // Update Existing Task
  on(TasksActions.updateTask, (state, {taskId, task}) => {
    // there is absolutely a more appropriate way of doin this I'm just running low on time :)
    return [...state.filter((task) => task.id !== taskId), task];
  })
);