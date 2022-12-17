// Packages
import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';

// Interfaces and types
import { IMiddleware } from './middleware.interface';

export class ValidateMiddleware implements IMiddleware {
	constructor(private readonly classToValidate: ClassConstructor<object>) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		const instance = plainToInstance(this.classToValidate, req.body);

		validate(instance).then((errors: ValidationError[]) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
