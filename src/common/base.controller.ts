import { Response, Router } from 'express';
import { ILogger } from '../logger/logger.interface';
import { IControllerRoute } from './route.interface';

export { Router } from 'express';

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  private send<T>(res: Response, code: number, message: T) {
    res.type('application/json');
    return res.status(code).json(message);
  }

  protected ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  protected created(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);

      this.router[route.method](route.path, route.func.bind(this));
    }
  }
}
