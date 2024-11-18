export class Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    category: string;

    constructor(id?: number, title?: string, description?: string, dueDate?: Date, category?: string) {
        this.id = id ?? 0;
        this.title = title ?? "";
        this.description = description ?? "";
        this.dueDate = dueDate ?? new Date();
        this.category = category ?? "";
    }
}