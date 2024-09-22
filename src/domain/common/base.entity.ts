import { v4 } from "uuid";
import { BaseEvent } from "./base-event";
import { PrimaryColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

export abstract class BaseEntity {
  @PrimaryColumn()
  @AutoMap()
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
