import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class MyLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]) {
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.error(`[${new Date().toISOString()}] ${message}`);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {}
}