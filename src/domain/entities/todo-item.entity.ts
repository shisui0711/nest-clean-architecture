import { Column, Entity, ManyToOne } from "typeorm";
import { BaseAuditableEntity } from "../common/base-auditable.entity";
import { PriorityLevel } from "../enums/priority-level";
import { TodoList } from "./todo-list.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class TodoItem extends BaseAuditableEntity {
  @Column()
  @AutoMap()
  listId: string;
  @Column({ nullable: true })
  @AutoMap()
  title?: string;
  @Column({ nullable: true })
  note?: string;
  @Column()
  priority: PriorityLevel = PriorityLevel.none;
  @Column({ nullable: true })
  reminder?: Date;
  @ManyToOne(() => TodoList, (todoList) => todoList.items)
  list: TodoList;
}
