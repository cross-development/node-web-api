// Packages
import { injectable, inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';

// Classes
import { HTTPError } from './http-error.class';

// Interfaces and types
import { TYPES } from '../common/types';
import { ILogger } from '../logger/logger.interface';
import { IExceptionFilter } from './exception.filter.interface';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {}

	public catch(error: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (error instanceof HTTPError) {
			this.logger.error(`[${error.context}] Error ${error.statusCode}: ${error.message}`);

			res.status(error.statusCode).send({ error: error.message });
		} else {
			this.logger.error(`${error.message}`);

			res.status(500).send({ error: error.message });
		}
	}
}
