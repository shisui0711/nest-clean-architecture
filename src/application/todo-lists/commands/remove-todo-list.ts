import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TodoListDto } from "src/application/common/models/todo-list.dto";
import { TodoList } from "src/domain/entities/todo-list.entity";
import { EntityManager } from "typeorm";

export class RemoveTodoListCommand {
  id: string;
}

@CommandHandler(RemoveTodoListCommand)
export class RemoveTodoListHandler
  implements ICommandHandler<RemoveTodoListCommand, TodoListDto>
{
  constructor(
    private readonly em: EntityManager,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute(command: RemoveTodoListCommand): Promise<any> {
    const entity = await this.em.findOneOrFail(TodoList, {
      where: {
        id: command.id,
      },
    });

    this.em.remove(entity);
    return this.mapper.map(entity, TodoList, TodoListDto);
  }
}
