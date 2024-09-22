import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { BaseAuditableEntity } from "../common/base-auditable.entity";
import { PriorityLevel } from "../enums/priority-level";
import { TodoList } from "./todo-list.entity";

@Entity()
export class TodoItem extends BaseAuditableEntity {
  @Column()
  listId: string;

  @Column({ nullable: true })
  title?: string;

  @Column()
  note: string;

  @Column()
  priority: PriorityLevel;

  @Column()
  reminder: Date;

  @ManyToOne(() => TodoList, (todoList) => todoList)
  @JoinColumn({ name: 'listId' }) 
  list: TodoList;
}
