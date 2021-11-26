import { Context } from "aws-lambda";
import { LambdaLog } from "lambda-log";

export class SimplesLogger {
  
  private static instance: SimplesLogger;

  log: LambdaLog;

  private constructor(
    event: unknown,
    context: Context
  ) {
    this.log = new LambdaLog({meta: {event, context}});
  }

  error(msg: string | Error, meta?: object, tags?: string[]): void {
    this.log.console.warn(msg, meta, tags); 
  }

  info(msg: string | Error, meta?: object, tags?: string[]): void {
    this.log.console.info(msg, meta, tags); 
  }

  debug(msg: string | Error, meta?: object, tags?: string[]): void {
    this.log.console.debug(msg, meta, tags); 
  }

  static create(event: unknown, lambdaContext: Context) {
    this.instance = new this(event, lambdaContext);
    return this.instance;
  }

  static getInstance() {
    return Object.freeze(this.instance);
  }

}