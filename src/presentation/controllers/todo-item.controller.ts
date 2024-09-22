import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { plainToClass } from "class-transformer";
import { TodoItemDto } from "src/application/common/models/todo-item.dto";
import { CreateTodoItemCommand } from "src/application/todo-items/commands/create-todo-item";
import { RemoveTodoItemCommand } from "src/application/todo-items/commands/remove-todo-item";
import { GetTodoItemPaginationQuery } from "src/application/todo-items/queries/get-todo-item-pagination";

@Controller("todo-item")
export class TodoItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createTodoItem(
    @Body() body: CreateTodoItemCommand,
  ): Promise<TodoItemDto> {
    const command = plainToClass(CreateTodoItemCommand, body);
    return await this.commandBus.execute(command);
  }

  @Delete()
  async removeTodoItem(@Body() command: RemoveTodoItemCommand) {
    return await this.commandBus.execute(command);
  }

  @Get()
  async getTodoItemPagination(@Body() query: GetTodoItemPaginationQuery) {
    return await this.queryBus.execute(query);
  }
}
