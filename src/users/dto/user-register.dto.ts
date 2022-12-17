// Packages
import { IsEmail, IsString, Max, Min } from 'class-validator';

export class UserRegisterDto {
	@Min(1)
	@Max(50)
	@IsString({ message: 'Name has not been provided' })
	name: string;

	@IsEmail({}, { message: 'Email or password is not correct' })
	email: string;

	@Min(8)
	@Max(50)
	@IsString({ message: 'Email or password is not correct' })
	password: string;
}
