import { Inject, Request } from "@nestjs/common";
import { IUser } from "src/application/common/interfaces/user.interface";
import { BaseAuditableEntity } from "src/domain/common/base-auditable.entity";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";

@EventSubscriber()
export class AuditableEntitySubcriber
  implements EntitySubscriberInterface<BaseAuditableEntity>
{
  // constructor(@Inject(IUser) private readonly currentUser: IUser) {}

  listenTo() {
    return BaseAuditableEntity;
  }

  beforeInsert(event: InsertEvent<BaseAuditableEntity>): Promise<any> | void {
    event.entity.created = new Date();
    event.entity.lastModified = new Date();
    // event.entity.createdBy = this.currentUser.getCurrentUser();
    // event.entity.lastModifiedBy = this.currentUser.getCurrentUser();
    event.entity.createdBy = "";
    event.entity.lastModifiedBy = "";
  }

  beforeUpdate(event: UpdateEvent<BaseAuditableEntity>): Promise<any> | void {
    event.entity.lastModified = new Date();
    // event.entity.lastModifiedBy = this.currentUser.getCurrentUser();
    event.entity.lastModifiedBy = "";
  }
}
