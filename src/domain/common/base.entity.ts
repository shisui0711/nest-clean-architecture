import { Entity, PrimaryKey } from "@mikro-orm/core";
import { v4 } from "uuid";
import { BaseEvent } from "./base-event";

@Entity()
export abstract class BaseEntity {
  @PrimaryKey()
  id: string = v4();

  private _domainEvents = [];

  public domainEvents: Readonly<BaseEvent> = this._domainEvents;

  public addDomainEvent(domainEvent: BaseEvent) {
    this._domainEvents.push(domainEvent);
  }

  public removeDomainEvent(domainEvent: BaseEvent) {
    this._domainEvents.filter((item) => item !== domainEvent);
  }

  public clearDomainEvent() {
    this._domainEvents = [];
  }
}
