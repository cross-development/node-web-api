// Packages
import { Container, ContainerModule, interfaces } from 'inversify';

// App
import { App } from './app';

// Services
import { UserService } from './users/users.service';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from './config/config.service';

// Controllers
import { UserController } from './users/users.controller';

// Filters
import { ExceptionFilter } from './errors/exception.filter';

// Interfaces and types
import { TYPES } from './common/types';
import { ILogger } from './logger/logger.interface';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUserController, IUserService } from './users/users.interfaces';

export interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	// Services
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	// Filters
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
	// Controllers
	bind<IUserController>(TYPES.IUserController).to(UserController).inSingletonScope();
	// App
	bind<App>(TYPES.Application).to(App).inSingletonScope();
});

const bootstrap = (): IBootstrapReturn => {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
