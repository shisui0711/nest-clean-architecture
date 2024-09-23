import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { plainToClass } from "class-transformer";
import { TodoItemDto } from "src/application/common/models/todo-item.dto";
import { GetTodoItemPaginationQuery } from "src/application/todo-items/queries/get-todo-item-pagination";
import { CreateTodoListCommand } from "src/application/todo-lists/commands/create-todo-list";
import { RemoveTodoListCommand } from "src/application/todo-lists/commands/remove-todo-list";

@Controller("todo-list")
export class TodoListController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createTodoList(
    @Body() body: CreateTodoListCommand,
  ): Promise<TodoItemDto> {
    const command = plainToClass(CreateTodoListCommand, body);
    return await this.commandBus.execute(command);
  }

  @Delete()
  async removeTodoItem(@Body() body: RemoveTodoListCommand) {
    const command = plainToClass(RemoveTodoListCommand, body);
    return await this.commandBus.execute(command);
  }

  @Get()
  async getTodoItemPagination(@Body() query: GetTodoItemPaginationQuery) {
    return await this.queryBus.execute(query);
  }
}
