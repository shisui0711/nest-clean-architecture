import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseAuditableEntity } from "../common/base-auditable.entity";
import { PriorityLevel } from "../enums/priority-level";
import { TodoList } from "./todo-list.entity";

@Entity()
export class TodoItem extends BaseAuditableEntity {
  @Property()
  listId: string;
  @Property()
  title?: string;
  @Property()
  note: string;
  @Property()
  priority: PriorityLevel;
  @Property()
  reminder: Date;
  @ManyToOne<TodoList, TodoItem>(() => TodoList)
  list: TodoList;
}
