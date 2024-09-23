import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { plainToClass } from "class-transformer";
import { SignInCommand } from "src/application/identities/commands/sign-in.command";
import { SignUpCommand } from "src/application/identities/commands/sign-up.command";
import { AllowAnonymous } from "../security/allow-anonymous.decorator";

@AllowAnonymous()
@Controller("auth")
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @AllowAnonymous()
  @Post("sign-in")
  signIn(@Body() body: SignInCommand) {
    const command = plainToClass(SignInCommand, body);
    return this.commandBus.execute(command);
  }

  @AllowAnonymous()
  @Post("sign-up")
  signUp(@Body() body: SignUpCommand) {
    const command = plainToClass(SignUpCommand, body);
    return this.commandBus.execute(command);
  }
}
