// Packages
import { Request, Response, NextFunction, Router } from 'express';

// Interfaces and types
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
	path: string;
	middleware?: IMiddleware[];
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	func(req: Request, res: Response, next: NextFunction): void;
}

export type ExpressReturnType = Response<any, Record<string, any>>;
