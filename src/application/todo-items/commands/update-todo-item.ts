import { EntityManager } from "@mikro-orm/sqlite";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TodoItem } from "src/domain/entities/todo-item.entity";

export class UpdateTodoItemCommand {
  constructor(
    public readonly id: string,
    public readonly title?: string,
  ) {}
}

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler
  implements ICommandHandler<UpdateTodoItemCommand>
{
  constructor(private readonly em: EntityManager) {}

  async execute(command: UpdateTodoItemCommand): Promise<any> {
    const entity = await this.em.findOneOrFail(TodoItem, {
      id: command.id,
    });

    entity.title = command.title;
    await this.em.persistAndFlush(entity);
  }
}
