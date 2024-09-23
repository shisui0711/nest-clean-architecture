import { Inject, Injectable, Scope } from "@nestjs/common";
import { IUser } from "src/application/common/interfaces/user.interface";
import { REQUEST } from "@nestjs/core";

@Injectable({ scope: Scope.REQUEST })
export class CurrentUser extends IUser {
  constructor(@Inject(REQUEST) private readonly request: Request) {
    super();
  }
  getCurrentUser(): string {
    throw new Error("Method not implemented.");
  }
}
