// Packages
import { UserModel } from '.prisma/client';
import { inject, injectable } from 'inversify';

// Services
import { PrismaService } from '../database/prisma.service';

// Entities
import { User } from './user.entity';

// Interfaces and types
import { TYPES } from '../common/types';
import { IUserRepository } from './users.interfaces';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	public create(user: User): Promise<UserModel> {
		const { email, name, password } = user;

		return this.prismaService.client.userModel.create({
			data: { email, name, password },
		});
	}

	public find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({ where: { email } });
	}
}
