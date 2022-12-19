// Packages
import { sign } from 'jsonwebtoken';
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

// Guards
import { AuthGuard } from '../common/auth.guard';

// Interfaces and types
import { TYPES } from '../common/types';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from '../config/config.service.interface';
import { IUserController, IUserService, UserRequestType } from './users.interfaces';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private readonly loggerService: ILogger,
		@inject(TYPES.IUserService) private readonly userService: IUserService,
		@inject(TYPES.IConfigService) private readonly configService: IConfigService,
	) {
		super(loggerService);

		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login, middleware: [new ValidateMiddleware(UserLoginDto)] },
			{ path: '/register', method: 'post', func: this.register, middleware: [new ValidateMiddleware(UserRegisterDto)] },
			{ path: '/info', method: 'get', func: this.info, middleware: [new AuthGuard()] },
		]);
	}

	public async login(req: UserRequestType<UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.validateUser(req.body);

		if (!result) {
			return next(new HTTPError(401, 'Auth error', 'login'));
		}

		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));

		this.ok(res, { jwt });
	}

	public async register(req: UserRequestType<UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(req.body);

		if (!result) {
			return next(new HTTPError(422, 'User is already exists', 'register'));
		}

		this.ok(res, { email: result.email, id: result.id });
	}

	public async info(req: UserRequestType<UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const userInfo = await this.userService.getUserInfo(req.user);

		if (!userInfo) {
			return next(new HTTPError(404, 'User not found', 'info'));
		}

		this.ok(res, { email: userInfo.email, id: userInfo.id });
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(error, token) => {
					if (error) {
						reject(error);
					}

					resolve(token as string);
				},
			);
		});
	}
}
