export class Category {
    id: number;
    title: string;
    visible: boolean;

    constructor(id?: number, title?: string, visible?: boolean) {
        this.id = id ?? 0;
        this.title = title ?? "";
        this.visible = visible ?? true;
    }
}