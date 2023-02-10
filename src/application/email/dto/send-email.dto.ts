import {ApiProperty} from "@nestjs/swagger"
import {IsNotEmpty, IsString} from "class-validator"

export class SendEmailDto {

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'Email sender',
		default: 'John Sender'
	})
	name: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Sender's email address",
		default: 'example@mail.com'
	})
	from: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Subject of the email",
		default: 'Example subject'
	})
	subject: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Subject of the email",
		default: 'Example content'
	})
	content: string

}
