import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { EntityManager } from "typeorm";
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

  async execute(command: RemoveTodoItemCommand): Promise<void> {
    const entity = await this.em.findOneOrFail(TodoItem, {
      where: { id: command.id },
    });

    await this.em.remove(entity);
    entity.addDomainEvent(new TodoItemDeletedEvent(entity));
    return;
  }
}
