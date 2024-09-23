import { AutoMap } from "@automapper/classes";
import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { IIdentityService } from "src/application/common/abtracts/identity.abstract";
import { User } from "src/domain/entities/user.entity";

export class SignUpCommand {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  //More field for business rule
}

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand, boolean> {
  constructor(private readonly identityService: IIdentityService) {}
  async execute(command: SignUpCommand): Promise<boolean> {
    const user = await this.identityService.findByNameAsync(command.username);
    if (user) throw new BadRequestException("User already exists");
    const newUser = plainToClass(User, command);
    return await this.identityService.createUserAsync(
      newUser,
      command.password,
    );
  }
}
