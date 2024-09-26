import { Global, Module } from "@nestjs/common";
import { TodoItemController } from "./controllers/todo-item.controller";
import { CurrentUser } from "./services/current-user.service";
import { IUser } from "../application/common/abtracts/user.abstract";
import { TodoListController } from "./controllers/todo-list.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./security/jwt.guard";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./controllers/auth.controller";
import { CqrsModule } from "@nestjs/cqrs";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PassportModule,
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.getOrThrow<string>("jwt.secretKey"),
        signOptions: {
          expiresIn: configService.getOrThrow<number>("jwt.expiresIn"),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TodoItemController, TodoListController, AuthController],
  providers: [
    {
      provide: IUser,
      useClass: CurrentUser,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [{ provide: IUser, useClass: CurrentUser }],
})
export class PresentationModule {}
