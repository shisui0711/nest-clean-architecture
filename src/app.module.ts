import { Module } from "@nestjs/common";
import { ApplicationModule } from "./application/application.module";
import { TodoItemController } from "./presentation/controllers/todo-item.controller";
import { CurrentUser } from "./presentation/services/current-user.service";
import { IUser } from "./application/common/abtracts/user.abstract";
import { TodoListController } from "./presentation/controllers/todo-list.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./presentation/config/configuration";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./presentation/security/jwt.guard";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./presentation/security/jwt.strategy";
import { AuthController } from "./presentation/controllers/auth.controller";

@Module({
  imports: [
    ApplicationModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PassportModule,
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
    JwtStrategy,
    {
      provide: IUser,
      useClass: CurrentUser,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
