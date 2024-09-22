
import { v4 } from "uuid";
import { BaseEvent } from "./base-event";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
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
