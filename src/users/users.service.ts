// Packages
import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

// Entities
import { User } from './user.entity';

// Dto
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

// Interfaces and types
import { TYPES } from '../common/types';
import { IUserRepository, IUserService } from './users.interfaces';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private readonly configService: IConfigService,
		@inject(TYPES.IUserRepository) private readonly userRepository: IUserRepository,
	) {}

	public async createUser(dto: UserRegisterDto): Promise<UserModel | null> {
		const { email, name, password } = dto;

		const newUser = new User(email, name);

		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));

		const existedUser = await this.userRepository.find(email);

		if (existedUser) {
			return null;
		}

		return this.userRepository.create(newUser);
	}

	public async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
