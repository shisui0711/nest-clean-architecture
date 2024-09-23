import { User } from "src/domain/entities/user.entity";

export abstract class IJwtService {
  abstract generateAccessToken(user: User): Promise<string>;
  abstract generateRefreshToken(user: User): Promise<string>;
}
