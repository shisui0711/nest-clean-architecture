import { Entity, Column } from "typeorm";
import { BaseAuditableEntity } from "../common/base-auditable.entity";

@Entity()
export class User extends BaseAuditableEntity {
  @Column()
  username: string;
  @Column()
  email: string;
  @Column({ nullable: true })
  passwordHash?: string;
}
