// Packages
import { injectable } from 'inversify';

// Entities
import { User } from './user.entity';

// Dto
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

// Interfaces and types
import { IUserService } from './users.interfaces';

@injectable()
export class UserService implements IUserService {
	public async createUser(dto: UserRegisterDto): Promise<User | null> {
		const { email, name, password } = dto;

		const newUser = new User(email, name);
		await newUser.setPassword(password);

		return null;
	}

	public async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
