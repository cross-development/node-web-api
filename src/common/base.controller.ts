import { Response, Router } from 'express';
import { ILogger } from '../logger/logger.interface';
import { IControllerRoute } from './route.interface';

export { Router } from 'express';

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private readonly logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  private send<T>(res: Response, code: number, message: T): void {
    res.type('application/json');
    res.status(code).json(message);
    return;
  }

  protected ok<T>(res: Response, message: T): void {
    this.send<T>(res, 200, message);
    return;
  }

  protected created(res: Response): void {
    res.sendStatus(201);
    return;
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);

      this.router[route.method](route.path, route.func.bind(this));
    }
  }
}
