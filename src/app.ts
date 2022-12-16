import express, { Express } from 'express';
import { injectable, inject } from 'inversify';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { TYPES } from './common/types';
import 'reflect-metadata';

@injectable()
export class App {
	private app: Express;
	private port: number;

	constructor(
		@inject(TYPES.ILogger) private readonly logger: ILogger,
		@inject(TYPES.IUserController) private readonly userController: UserController,
		@inject(TYPES.IExceptionFilter) private readonly exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExceptionFilters();

		this.listen();
	}

	private useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	private useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	private async listen(): Promise<void> {
		this.app.listen(this.port, () => {
			this.logger.log(`Server started listening on port ${this.port}`);
		});
	}
}
