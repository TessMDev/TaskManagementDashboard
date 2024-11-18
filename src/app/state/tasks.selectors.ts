import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Task } from '../Models/Task';

export const selectAllTasks = createFeatureSelector<Task[]>("tasks");

export const selectVisibleTasks = (filters: string[], orderByDueDate: boolean) => createSelector(
    selectAllTasks,
    (state) => {
        if (orderByDueDate) {
            return state.filter(item => filters.includes(item.category)).sort((a, b) => a.dueDate < b.dueDate ? -1 : a.dueDate > b.dueDate ? 1 : 0);
        }
        else {
            return state.filter(item => filters.includes(item.category)).sort((a, b) => a.id < b.id ? -1 : a.dueDate > b.dueDate ? 1 : 0);
        }
    }
);