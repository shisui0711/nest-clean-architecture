import { AutomapperModule } from "@automapper/nestjs";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MapperProfile } from "./common/mappings/mapper-profile";
import { CreateTodoItemHandler } from "./todo-items/commands/create-todo-item";
import { RemoveTodoItemHandler } from "./todo-items/commands/remove-todo-item";
import { GetTodoItemPaginationHandler } from "./todo-items/queries/get-todo-item-pagination";
import { classes } from "@automapper/classes";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { PerformanceMiddleware } from "./common/middlewares/performance.middleware";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { DomainModule } from "src/domain/domain.module";

export const CommandHandlers = [CreateTodoItemHandler, RemoveTodoItemHandler];
export const QueryHandlers = [GetTodoItemPaginationHandler];
export const EventHandlers = [];

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DomainModule,
    InfrastructureModule,
  ],
  providers: [
    MapperProfile,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [
    InfrastructureModule,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
    consumer.apply(PerformanceMiddleware).forRoutes("*");
  }
}
