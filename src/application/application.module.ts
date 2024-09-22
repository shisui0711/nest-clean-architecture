
import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";
import { MapperProfile } from "./common/mappings/mapper-profile";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateTodoItemCommand } from "./todo-items/commands/create-todo-item";
import { RemoveTodoItemCommand } from "./todo-items/commands/remove-todo-item";
import { GetTodoItemPaginationQuery } from "./todo-items/queries/get-todo-item-pagination";
import { classes } from "@automapper/classes";

export const CommandHandlers = [CreateTodoItemCommand, RemoveTodoItemCommand];
export const QueryHandlers = [GetTodoItemPaginationQuery];
export const EventHandlers = [];

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    CqrsModule,
  ],
  providers: [
    MapperProfile,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [CqrsModule],
})
export class ApplicationModule {}
