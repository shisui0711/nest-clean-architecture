import { Controller } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateTodoItemCommand } from "src/application/todo-items/commands/create-todo-item";
import { RemoveTodoItemCommand } from "src/application/todo-items/commands/remove-todo-item";
import { GetTodoItemPaginationQuery } from "src/application/todo-items/queries/get-todo-item-pagination";

@Controller()
export class TodoItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  createTodoItem(command: CreateTodoItemCommand) {
    this.commandBus.execute(command);
  }

  removeTodoItem(command: RemoveTodoItemCommand) {
    this.commandBus.execute(command);
  }

  getTodoItemPagination(query: GetTodoItemPaginationQuery) {
    this.queryBus.execute(query);
  }
}
