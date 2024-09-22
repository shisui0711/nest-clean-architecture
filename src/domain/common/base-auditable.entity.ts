import { Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";

export abstract class BaseAuditableEntity extends BaseEntity {
  @Property()
  created: Date;
  @Property()
  createdBy: string;
  @Property()
  lastModified: Date;
  @Property()
  lastModifiedBy: string;
}
