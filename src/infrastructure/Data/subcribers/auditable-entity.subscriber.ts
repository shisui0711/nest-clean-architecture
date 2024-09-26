import { Injectable, OnModuleInit, Scope } from "@nestjs/common";
import { IUser } from "src/application/common/abtracts/user.abstract";
import { BaseAuditableEntity } from "src/domain/common/base-auditable.entity";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";

@Injectable({ scope: Scope.REQUEST })
@EventSubscriber()
export class AuditableEntitySubcriber
  implements EntitySubscriberInterface<BaseAuditableEntity>, OnModuleInit
{
  constructor(private readonly currentUser: IUser) {
    console.log("CurrentUser", currentUser);
  }
  onModuleInit() {
    throw new Error("Method not implemented.");
  }

  listenTo() {
    return BaseAuditableEntity;
  }

  beforeInsert(event: InsertEvent<BaseAuditableEntity>): Promise<any> | void {
    event.entity.created = new Date();
    event.entity.lastModified = new Date();
    event.entity.createdBy = this.currentUser.getCurrentUser();
    event.entity.lastModifiedBy = this.currentUser.getCurrentUser();
    // event.entity.createdBy = "";
    // event.entity.lastModifiedBy = "";
  }

  beforeUpdate(event: UpdateEvent<BaseAuditableEntity>): Promise<any> | void {
    event.entity.lastModified = new Date();
    event.entity.lastModifiedBy = this.currentUser.getCurrentUser();
    // event.entity.lastModifiedBy = "";
  }
}
