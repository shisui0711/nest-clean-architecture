import { Module } from "@nestjs/common";
import { ApplicationModule } from "./application/application.module";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { TodoItemController } from "./presentation/controllers/todo-item.controller";

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [TodoItemController],
  providers: [],
})
export class AppModule {}
