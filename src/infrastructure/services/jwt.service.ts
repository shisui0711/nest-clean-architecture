import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IJwtService } from "src/application/common/abtracts/jwt.abstract";
import { User } from "src/domain/entities/user.entity";

@Injectable()
export class JwtServiceIml implements IJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async generateAccessToken(user: User) {
    const payload = {
      sub: user.id,
      roles: ["access"],
    };
    const token = await this.jwtService.signAsync(payload, {
      audience: this.configService.getOrThrow<string>("jwt.audience"),
      issuer: this.configService.getOrThrow<string>("jwt.issuer"),
      expiresIn: this.configService.getOrThrow<string>("jwt.expiresIn"),
      secret: this.configService.getOrThrow<string>("jwt.secretKey"),
    });
    return token;
  }
  async generateRefreshToken(user: User) {
    const payload = {
      sub: user.id,
      roles: ["access"],
    };
    const token = await this.jwtService.signAsync(payload, {
      audience: this.configService.getOrThrow<string>("jwt.audience"),
      issuer: this.configService.getOrThrow<string>("jwt.issuer"),
      expiresIn: this.configService.getOrThrow<string>("jwt.expiresRefreshIn"),
      secret: this.configService.getOrThrow<string>("jwt.secretKey"),
    });
    return token;
  }
}
