import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TodoItem } from "src/domain/entities/todo-item.entity";
import { EntityManager } from "typeorm";

export class CreateTodoItemCommand {
  constructor(
    public readonly listId: string,
    public readonly title?: string,
  ) {}
}

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler
  implements ICommandHandler<CreateTodoItemCommand, string>
{
  constructor(private readonly em: EntityManager) {}
  async execute(command: CreateTodoItemCommand) {
    const todoItem = this.em.create(TodoItem, {
      listId: command.listId,
      title: command.title,
    });
    return todoItem.id;
  }
}
