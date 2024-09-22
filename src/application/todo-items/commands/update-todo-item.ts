import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TodoItem } from "src/domain/entities/todo-item.entity";
import { EntityManager } from "typeorm";

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

  async execute(command: UpdateTodoItemCommand): Promise<TodoItem> {
    const entity = await this.em.findOneOrFail(TodoItem, {
      where: { id: command.id },
    });

    
    if (command.title) {
      entity.title = command.title;
    }

    await this.em.save(entity);
    
    return entity; 
  }
}
