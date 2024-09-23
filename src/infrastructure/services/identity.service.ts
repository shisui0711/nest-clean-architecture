import { Injectable, Logger, Scope } from "@nestjs/common";
import { IIdentityService } from "src/application/common/abtracts/identity.abstract";
import { User } from "src/domain/entities/user.entity";
import { EntityManager } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable({ scope: Scope.TRANSIENT })
export class IdentityService implements IIdentityService {
  private readonly logger = new Logger(IdentityService.name);
  constructor(private readonly em: EntityManager) {}

  getRolesAsync(userId: string): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  getUserNameAsync(userId: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  async findByNameAsync(username: string): Promise<User | null> {
    return await this.em.findOne(User, {
      where: {
        username: username,
      },
    });
  }
  async findByIdAsync(userId: string): Promise<User | null> {
    return await this.em.findOne(User, {
      where: {
        id: userId,
      },
    });
  }
  async findByEmailAsync(email: string): Promise<User | null> {
    return await this.em.findOne(User, {
      where: {
        email: email,
      },
    });
  }
  async checkPasswordAsync(user: User, password: string) {
    const userExist = await this.em.findOne(User, {
      where: {
        id: user.id,
      },
    });
    return await bcrypt.compare(password, userExist.passwordHash);
  }
  async changePasswordAsync(
    user: User,
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    try {
      const isValidPassword = await this.checkPasswordAsync(
        user,
        currentPassword,
      );
      if (!isValidPassword) return false;
      user.passwordHash = await bcrypt.hash(newPassword, 10);
      await this.em.save(user);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
  async createUserAsync(user: User, password: string): Promise<boolean> {
    try {
      user.passwordHash = await bcrypt.hash(password, 10);
      const newUser = await this.em.create(User, user);
      await this.em.save(newUser);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
  async removeUserAsync(userId: string): Promise<boolean> {
    try {
      const userExist = await this.em.findOne(User, {
        where: {
          id: userId,
        },
      });
      await this.em.remove(userExist);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
  generateEmailConfirmationTokenAsync(user: User): Promise<string> {
    throw new Error("Method not implemented.");
  }
  generatePasswordResetTokenAsync(user: User): Promise<string> {
    throw new Error("Method not implemented.");
  }
  confirmEmailAsync(user: User, token: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  resetPasswordAsync(
    user: User,
    token: string,
    newPassword: string,
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
