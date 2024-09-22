import { EntityManager } from "@mikro-orm/sqlite";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TodoItem } from "src/domain/entities/todo-item.entity";
import { TodoItemDeletedEvent } from "src/domain/events/todo-item/deleted.event";

export class RemoveTodoItemCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(RemoveTodoItemCommand)
export class RemoveTodoItemHandler
  implements ICommandHandler<RemoveTodoItemCommand>
{
  constructor(private readonly em: EntityManager) {}

  async execute(command: RemoveTodoItemCommand): Promise<any> {
    const entity = await this.em.findOneOrFail(TodoItem, {
      id: command.id,
    });

    this.em.remove(entity);
    entity.addDomainEvent(new TodoItemDeletedEvent(entity));
    await this.em.flush();
  }
}
