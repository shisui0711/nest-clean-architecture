import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IIdentityService } from "src/application/common/abtracts/identity.abstract";
import { IJwtService } from "src/application/common/abtracts/jwt.abstract";
import { TokenResponse } from "src/application/common/models/token-response";

export class SignInCommand {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

@CommandHandler(SignInCommand)
export class SignInHandler
  implements ICommandHandler<SignInCommand, TokenResponse>
{
  constructor(
    private readonly identityService: IIdentityService,
    private readonly jwtService: IJwtService,
  ) {}
  async execute(command: SignInCommand): Promise<TokenResponse> {
    console.log("jwtService:", this.jwtService);
    const user = await this.identityService.findByNameAsync(command.username);
    if (!user) throw new NotFoundException("User not exists");
    const isValidPassword = await this.identityService.checkPasswordAsync(
      user,
      command.password,
    );

    if (!isValidPassword) throw new UnauthorizedException("Invalid Password");
    const accessToken = await this.jwtService.generateAccessToken(user);
    const refreshToken = await this.jwtService.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }
}
