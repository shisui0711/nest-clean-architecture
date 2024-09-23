import { User } from "src/domain/entities/user.entity";

export abstract class IIdentityService {
  abstract getRolesAsync(userId: string): Promise<string[]>;
  abstract getUserNameAsync(userId: string): Promise<string | null>;
  abstract findByNameAsync(username: string): Promise<User | null>;
  abstract findByIdAsync(userId: string): Promise<User | null>;
  abstract findByEmailAsync(email: string): Promise<User | null>;
  abstract checkPasswordAsync(user: User, password: string);
  abstract changePasswordAsync(
    user: User,
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean>;
  abstract createUserAsync(user: User, password: string): Promise<boolean>;
  abstract removeUserAsync(userId: string): Promise<boolean>;
  abstract generateEmailConfirmationTokenAsync(user: User): Promise<string>;
  abstract generatePasswordResetTokenAsync(user: User): Promise<string>;
  abstract confirmEmailAsync(user: User, token: string): Promise<boolean>;
  abstract resetPasswordAsync(
    user: User,
    token: string,
    newPassword: string,
  ): Promise<boolean>;
}
