import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { ApplicationModule } from "./application/application.module";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { TodoItemController } from "./presentation/controllers/todo-item.controller";
import { MyService } from "./services/my.service";
import { MyLogger } from "./services/logger.service";
import { RedirectMiddleware } from "./middleware/redirect.middleware";

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [TodoItemController],
  providers: [MyService, MyLogger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RedirectMiddleware).forRoutes('*'); 
  }
}
