// Packages
import { IsEmail, IsString, Max, Min } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Email or password is not correct' })
	email: string;

	@Min(8)
	@Max(50)
	@IsString({ message: 'Email or password is not correct' })
	password: string;
}
