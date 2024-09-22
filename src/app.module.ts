import { Module } from "@nestjs/common";
import { ApplicationModule } from "./application/application.module";
import { TodoItemController } from "./presentation/controllers/todo-item.controller";
import { CurrentUser } from "./presentation/services/current-user.service";
import { IUser } from "./application/common/interfaces/user.interface";

@Module({
  imports: [ApplicationModule],
  controllers: [TodoItemController],
  providers: [
    {
      provide: IUser,
      useClass: CurrentUser,
    },
  ],
})
export class AppModule {}
