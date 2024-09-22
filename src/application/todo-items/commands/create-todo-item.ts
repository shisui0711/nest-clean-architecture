import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { EntityManager } from "typeorm";
import { TodoItem } from "src/domain/entities/todo-item.entity";


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

    const savedTodoItem = await this.em.save(todoItem);
    return savedTodoItem.id;
  }
}
