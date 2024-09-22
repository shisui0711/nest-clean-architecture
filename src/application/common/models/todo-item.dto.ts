import { AutoMap } from "@automapper/classes";

export class TodoItemDto {
  @AutoMap()
  id: string;
  @AutoMap()
  listId: string;
  @AutoMap()
  title?: string;
}
