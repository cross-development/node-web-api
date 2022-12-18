// Packages
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

// Interfaces and types
import { TYPES } from '../common/types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	public readonly client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {
		this.client = new PrismaClient();
	}

	public async connect(): Promise<void> {
		try {
			await this.client.$connect();

			this.logger.log('[PrismaService] Connected successfully');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error('[PrismaService] Failed: ' + error.message);
			}
		}
	}

	public async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
