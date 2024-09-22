import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DomainModule } from "src/domain/domain.module";
import { TodoItem } from "src/domain/entities/todo-item.entity";
import { TodoList } from "src/domain/entities/todo-list.entity";
import { AuditableEntitySubcriber } from "./data/subcribers/auditable-entity.subscriber";
import { DispatchDomainEventsSubcriber } from "./data/subcribers/dispatch-domain-events.subcriber";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: `${__dirname}/data`,
      entities: [TodoItem, TodoList],
      synchronize: process.env.NODE_ENV !== "production",
    }),
    DomainModule,
  ],
  providers: [AuditableEntitySubcriber, DispatchDomainEventsSubcriber],
  exports: [
    AuditableEntitySubcriber,
    DispatchDomainEventsSubcriber,
    TypeOrmModule,
  ],
})
export class InfrastructureModule {}
