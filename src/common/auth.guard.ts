// Packages
import { Request, Response, NextFunction } from 'express';

// Interfaces and types
import { IMiddleware } from './middleware.interface';

export class AuthGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}

		res.status(401).send({ error: 'Not Authorized' });
	}
}
