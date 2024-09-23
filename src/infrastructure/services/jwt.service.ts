import { Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IJwtService } from "src/application/common/abtracts/jwt.abstract";
import { User } from "src/domain/entities/user.entity";

@Injectable({ scope: Scope.REQUEST })
export class JwtServiceIml extends IJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    console.log(jwtService);
    super();
  }
  async generateAccessToken(user: User) {
    const payload = {
      sub: user.id,
      role: ["access"],
    };
    const token = await this.jwtService.signAsync(payload, {
      audience: this.configService.getOrThrow<string>("jwt.audience"),
      issuer: this.configService.getOrThrow<string>("jwt.issuer"),
      expiresIn: this.configService.getOrThrow<string>("jwt.expiresIn"),
    });
    return token;
  }
  async generateRefreshToken(user: User) {
    const payload = {
      sub: user.id,
      role: ["access"],
    };
    const token = await this.jwtService.signAsync(payload, {
      audience: this.configService.getOrThrow<string>("jwt.audience"),
      issuer: this.configService.getOrThrow<string>("jwt.issuer"),
      expiresIn: this.configService.getOrThrow<string>("jwt.expiresRefreshIn"),
    });
    return token;
  }
}
