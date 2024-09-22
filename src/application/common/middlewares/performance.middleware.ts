import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class PerformanceMiddleware implements NestMiddleware {
  private logger = new Logger("BadPerformance");
  use(request: Request, response: Response, next: NextFunction) {
    const start = process.hrtime();
    next();
    const elapsed = process.hrtime(start);
    const elapsedTime = (elapsed[0] * 1e9 + elapsed[1]) / 1e6; // chuyển đổi thời gian sang milliseconds
    if (elapsedTime > 500) {
      this.logger.warn(`${request.path} (${elapsedTime} milliseconds)`);
    }
  }
}
