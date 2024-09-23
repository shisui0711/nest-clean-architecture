import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DomainModule } from "src/domain/domain.module";
import { TodoItem } from "src/domain/entities/todo-item.entity";
import { TodoList } from "src/domain/entities/todo-list.entity";
import { AuditableEntitySubcriber } from "./data/subcribers/auditable-entity.subscriber";
import { DispatchDomainEventsSubcriber } from "./data/subcribers/dispatch-domain-events.subcriber";
import { ConfigModule, ConfigService } from "@nestjs/config";

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
        entities: [TodoItem, TodoList],
        synchronize: true,
        subscribers: [AuditableEntitySubcriber, DispatchDomainEventsSubcriber],
      }),
      inject: [ConfigService],
    }),
    DomainModule,
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class InfrastructureModule {}
