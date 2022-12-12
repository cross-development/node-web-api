import express, { Express } from 'express';
import { ILogger } from './logger/logger.interface';
import { UserController } from './users/users.controller';

export class App {
  private app: Express;
  private port: number;
  private logger: ILogger;
  userController: UserController;

  constructor(logger: ILogger, userController: UserController) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
  }

  public async init(): Promise<void> {
    this.useRoutes();

    this.listen();
  }

  private useRoutes(): void {
    this.app.use('/users', this.userController.router);
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      this.logger.log(`Server started listening on port ${this.port}`);
    });
  }
}
