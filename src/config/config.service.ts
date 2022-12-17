// Packages
import { inject, injectable } from 'inversify';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
// Interfaces and types
import { TYPES } from '../common/types';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from './config.service.interface';

@injectable()
export class ConfigService implements IConfigService {
	private readonly config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {
		const result: DotenvConfigOutput = config();

		if (result.error) {
			this.logger.error('[ConfigService] Can not read .env file or it is not exists');
		} else {
			this.logger.log('[ConfigService] Configuration from .env file has been successfully downloaded');

			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
