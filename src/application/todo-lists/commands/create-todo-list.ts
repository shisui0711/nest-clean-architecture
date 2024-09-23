import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { TodoList } from "src/domain/entities/todo-list.entity";
import { EntityManager } from "typeorm";

export class CreateTodoListCommand {
  @ApiProperty()
  @IsNotEmpty()
  title?: string;
}

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand, string>
{
  constructor(
    private readonly em: EntityManager,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}
  async execute(command: CreateTodoListCommand): Promise<string> {
    const todoList = this.em.create(TodoList, {
      title: command.title,
    });
    await this.em.save(todoList);
    return todoList.id;
  }
}
