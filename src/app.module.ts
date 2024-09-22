import { Module } from "@nestjs/common";
import { ApplicationModule } from "./application/application.module";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { TodoItemController } from "./presentation/controllers/todo-item.controller";
import { DomainModule } from "./domain/domain.module";

@Module({
  imports: [DomainModule, ApplicationModule, InfrastructureModule],
  controllers: [TodoItemController],
  providers: [],
})
export class AppModule {}
