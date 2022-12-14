import express, { Express } from 'express';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { UserController } from './users/users.controller';

export class App {
  private app: Express;
  private port: number;

  constructor(
    private readonly logger: ILogger,
    private readonly userController: UserController,
    private readonly exceptionFilter: IExceptionFilter,
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

  private listen(): void {
    this.app.listen(this.port, () => {
      this.logger.log(`Server started listening on port ${this.port}`);
    });
  }
}
