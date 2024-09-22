
import { Column, Entity, OneToMany } from "typeorm";
import { BaseAuditableEntity } from "../common/base-auditable.entity";
import { TodoItem } from "./todo-item.entity";

@Entity()
export class TodoList extends BaseAuditableEntity {
  @Column()
  title?: string;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.list)
  items = new Array<TodoItem>();
}
