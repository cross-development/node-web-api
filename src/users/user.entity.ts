// Packages
import { hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(private readonly _email: string, private readonly _name: string) {}

	public get email(): string {
		return this._email;
	}

	public get name(): string {
		return this._name;
	}

	public get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}
}
