import { Injectable } from "@nestjs/common";
import { MyLogger } from "./logger.service";



@Injectable()
export class MyService {
    constructor(private readonly logger: MyLogger) { }

    online(user): void{
        this.logger.log(`User ${user?.name} online`);
    }
}