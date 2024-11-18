import { createActionGroup, props } from '@ngrx/store';
import { Task } from '../Models/Task';
import { Category } from '../Models/Category';

export const TasksActions = createActionGroup({
    source: 'Tasks',
    events: {
        'Add Task': props<{ task: Task }>(),
        'Remove Task': props<{ taskId: number }>(),
        'Update Task': props<{ taskId: number, task: Task }>()
    },
});

export const TasksApiActions = createActionGroup({
    source: 'Tasks API',
    events: {
        'Retrieved Tasks List': props<{ tasks: ReadonlyArray<Task> }>(),
    },
});