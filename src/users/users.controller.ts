// Packages
import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';

// Classes
import { HTTPError } from '../errors/http-error.class';

// Controllers
import { BaseController } from '../common/base.controller';

// Interfaces and types
import { TYPES } from '../common/types';
import { ILogger } from '../logger/logger.interface';
import { IUserController } from './users.controller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) logger: ILogger) {
		super(logger);

		this.bindRoutes([
			{ path: 'login', method: 'post', func: this.login },
			{ path: 'register', method: 'post', func: this.register },
		]);
	}

	public login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'Auth error'));
	}

	public register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}
}
