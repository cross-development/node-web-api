// Packages
import { Server } from 'http';
import { json } from 'body-parser';
import express, { Express } from 'express';
import { injectable, inject } from 'inversify';

// Services
import { PrismaService } from './database/prisma.service';

// Controllers
import { UserController } from './users/users.controller';

// Interfaces and types
import { TYPES } from './common/types';
import { ILogger } from './logger/logger.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';

@injectable()
export class App {
	private app: Express;
	private port: number;
	public server: Server;

	constructor(
		@inject(TYPES.ILogger) private readonly logger: ILogger,
		@inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
		@inject(TYPES.IUserController) private readonly userController: UserController,
		@inject(TYPES.IExceptionFilter) private readonly exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
		this.port = 3000;
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		await this.useDatabase();

		this.listen();
	}

	private useMiddleware(): void {
		this.app.use(json());
	}

	private useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	private useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	private async useDatabase(): Promise<void> {
		this.prismaService.connect();
	}

	private async listen(): Promise<void> {
		this.server = this.app.listen(this.port, () => {
			this.logger.log(`Server started listening on port ${this.port}`);
		});
	}
}
