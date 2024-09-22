import { BaseEvent } from "src/domain/common/base-event";
import { TodoItem } from "src/domain/entities/todo-item.entity";

export class TodoItemCreatedEvent extends BaseEvent {
  constructor(public readonly item: TodoItem) {
    super();
  }
}
