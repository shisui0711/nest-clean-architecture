import { BaseEntity } from "src/domain/common/base.entity";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";

@EventSubscriber()
export class DispatchDomainEventsSubcriber
  implements EntitySubscriberInterface<BaseEntity>
{
  listenTo() {
    return BaseEntity;
  }

  // constructor(private readonly eventBus: EventBus) {}

  afterInsert(event: InsertEvent<BaseEntity>): Promise<any> | void {
    this.handleChange(event.entity);
  }

  afterUpdate(event: UpdateEvent<BaseEntity>): Promise<any> | void {
    this.handleChange(event.entity as BaseEntity);
  }

  private handleChange(entity: BaseEntity) {
    // this.eventBus.publishAll(entity.domainEvents as []);
  }
}
