import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, IsString, IsUrl} from "class-validator";

export class CreateProjectDto {

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'Project name',
		default: 'API Portfolio Project'
	})
	name: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'Project description',
		default: 'RESTful API built with NestJS and Mongoose.'
	})

	description: string

	@IsString()
	@IsNotEmpty()
	@IsUrl()
	@ApiProperty({
		description: 'Project repository or deploy URL',
		default: 'https://github.com/tomazcx/portfolio-api'
	})
	url: string

	@IsArray()
	@IsString({each: true})
	@ApiProperty({
		description: 'Project tags',
		default: ['NestJS', 'Mongoose', 'Typescript', 'Jest', 'Swagger']
	})
	tags: string[]


}
