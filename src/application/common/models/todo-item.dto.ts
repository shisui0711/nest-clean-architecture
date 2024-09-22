export class TodoItemDto {
  constructor(
    public readonly id: string,
    public readonly listId: string,
    public readonly title?: string,
  ) {}
}
