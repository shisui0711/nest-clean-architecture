import { Body, Controller } from "@nestjs/common";
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
  createTodoItem(@Body() command: CreateTodoItemCommand) {
    this.commandBus.execute(command);
  }

  removeTodoItem(@Body() command: RemoveTodoItemCommand) {
    this.commandBus.execute(command);
  }

  getTodoItemPagination(@Body() query: GetTodoItemPaginationQuery) {
    this.queryBus.execute(query);
  }
}
