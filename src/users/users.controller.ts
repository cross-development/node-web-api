// Packages
import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { NextFunction, Response } from 'express';

// Classes
import { HTTPError } from '../errors/http-error.class';

// Controllers
import { BaseController } from '../common/base.controller';

// Dto
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

// Middleware
import { ValidateMiddleware } from '../common/validate.middleware';

// Interfaces and types
import { TYPES } from '../common/types';
import { ILogger } from '../logger/logger.interface';
import { IUserController, IUserService, UserRequestType } from './users.interfaces';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private readonly loggerService: ILogger,
		@inject(TYPES.IUserService) private readonly userService: IUserService,
	) {
		super(loggerService);

		this.bindRoutes([
			{ path: 'login', method: 'post', func: this.login, middleware: [new ValidateMiddleware(UserLoginDto)] },
			{ path: 'register', method: 'post', func: this.register, middleware: [new ValidateMiddleware(UserRegisterDto)] },
		]);
	}

	public login(req: UserRequestType<UserLoginDto>, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'Auth error'));
	}

	public async register(req: UserRequestType<UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(req.body);

		if (!result) {
			return next(new HTTPError(422, 'User is already exists'));
		}

		const response = { email: result.email };

		this.ok(res, response);
	}
}
