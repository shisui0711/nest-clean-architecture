import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseAuditableEntity } from "../common/base-auditable.entity";
import { TodoItem } from "./todo-item.entity";

@Entity()
export class TodoList extends BaseAuditableEntity {
  @Property()
  title?: string;

  @OneToMany<TodoItem, TodoList>(() => TodoItem, (todoItem) => todoItem.list)
  items = new Collection<TodoItem>(this);
}
