import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class SignInDto {

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'System user login',
		default: 'user-login'
	})
	user: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'System password',
		default: 'user-password'
	})
	password: string

}
