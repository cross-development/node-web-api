// Packages
import { Container, ContainerModule, interfaces } from 'inversify';

// App
import { App } from './app';

// Services
import { LoggerService } from './logger/logger.service';

// Controllers
import { UserController } from './users/users.controller';

// Filters
import { ExceptionFilter } from './errors/exception.filter';

// Interfaces and types
import { TYPES } from './common/types';
import { ILogger } from './logger/logger.interface';
import { IUserController } from './users/users.controller.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';

export interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.IUserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
});

const bootstrap = (): IBootstrapReturn => {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
