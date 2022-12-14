export class HTTPError extends Error {
	constructor(public readonly statusCode: number, public readonly message: string, public readonly context?: string) {
		super(message);
	}
}
