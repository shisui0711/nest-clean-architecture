import { Injectable, Scope } from "@nestjs/common";
import { IUser } from "src/application/common/abtracts/user.abstract";

@Injectable({ scope: Scope.TRANSIENT })
export class CurrentUser implements IUser {
  getCurrentUser(): string | null {
    return "Test";
  }
}
