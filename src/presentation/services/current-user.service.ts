import { IUser } from "src/application/common/interfaces/user.interface";

export class CurrentUser implements IUser {
  getCurrentUser(): string {
    throw new Error("Method not implemented.");
  }
}
