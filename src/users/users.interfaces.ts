// Packages
import { NextFunction, Request, Response } from 'express';

// Entities
import { User } from './user.entity';

// Dto
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

export type UserRequestType<T> = Request<{}, {}, T>;

export interface IUserController {
	login(req: Request, res: Response, next: NextFunction): void;
	register(req: Request, res: Response, next: NextFunction): void;
}

export interface IUserService {
	createUser(dto: UserRegisterDto): Promise<User | null>;
	validateUser(dto: UserLoginDto): Promise<boolean>;
}
