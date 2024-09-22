import { Column } from "typeorm";
import { BaseEntity } from "./base.entity";

export abstract class BaseAuditableEntity extends BaseEntity {
  @Column()
  created: Date;
  @Column()
  createdBy: string;
  @Column()
  lastModified: Date;
  @Column()
  lastModifiedBy: string;
}
