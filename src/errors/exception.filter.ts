import { NextFunction, Request, Response } from 'express';
import { HTTPError } from './http-error.class';
import { ILogger } from '../logger/logger.interface';
import { IExceptionFilter } from './exception.filter.interface';

export class ExceptionFilter implements IExceptionFilter {
  constructor(private readonly logger: ILogger) {}

  public catch(
    error: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (error instanceof HTTPError) {
      this.logger.error(
        `[${error.context}] Error ${error.statusCode}: ${error.message}`,
      );
      res.status(error.statusCode).send({ error: error.message });
    } else {
      this.logger.error(`${error.message}`);
      res.status(500).send({ error: error.message });
    }
  }
}
