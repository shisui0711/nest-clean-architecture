import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DomainModule } from "src/domain/domain.module";
import { TodoItem } from "src/domain/entities/todo-item.entity";
import { TodoList } from "src/domain/entities/todo-list.entity";
import { AuditableEntitySubcriber } from "./data/subcribers/auditable-entity.subscriber";
import { DispatchDomainEventsSubcriber } from "./data/subcribers/dispatch-domain-events.subcriber";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { IIdentityService } from "src/application/common/abtracts/identity.abstract";
import { IdentityService } from "./services/identity.service";
import { IJwtService } from "src/application/common/abtracts/jwt.abstract";
import { JwtServiceIml } from "./services/jwt.service";
import { User } from "src/domain/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.name"),
        entities: [TodoItem, TodoList, User],
        synchronize: true,
        subscribers: [AuditableEntitySubcriber, DispatchDomainEventsSubcriber],
      }),
      inject: [ConfigService],
    }),
    DomainModule,
    JwtModule,
    ConfigModule,
  ],
  providers: [
    {
      provide: IIdentityService,
      useClass: IdentityService,
    },
    {
      provide: IJwtService,
      useClass: JwtServiceIml,
    },
  ],
  exports: [TypeOrmModule, IIdentityService, IJwtService],
})
export class InfrastructureModule {}
