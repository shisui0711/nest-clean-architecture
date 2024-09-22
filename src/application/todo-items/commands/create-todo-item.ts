import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { TodoItemDto } from "src/application/common/models/todo-item.dto";
import { TodoItem } from "src/domain/entities/todo-item.entity";
import { EntityManager } from "typeorm";

export class CreateTodoItemCommand {
  constructor(
    private _listId: string,
    private _title?: string,
  ) {
    this.listId = _listId;
    this.title = _title;
  }

  @ApiProperty()
  @IsNotEmpty()
  public readonly listId: string;
  @ApiProperty()
  public readonly title?: string;
}

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler
  implements ICommandHandler<CreateTodoItemCommand, TodoItemDto>
{
  constructor(
    private readonly em: EntityManager,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}
  async execute(command: CreateTodoItemCommand) {
    const todoItem = this.em.create(TodoItem, {
      listId: command.listId,
      title: command.title,
    });
    await this.em.save(todoItem);
    return this.mapper.map(todoItem, TodoItem, TodoItemDto);
  }
}
