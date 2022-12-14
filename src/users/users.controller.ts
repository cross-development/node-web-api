import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';

export class UserController extends BaseController {
  constructor(logger: ILogger) {
    super(logger);

    this.bindRoutes([
      { path: 'login', method: 'post', func: this.login },
      { path: 'register', method: 'post', func: this.register },
    ]);
  }

  private login(req: Request, res: Response, next: NextFunction): void {
    next(new HTTPError(401, 'Auth error'));
  }

  private register(req: Request, res: Response, next: NextFunction): void {
    this.ok(res, 'register');
  }
}
