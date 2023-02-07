import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsOptional, IsString, IsUrl} from "class-validator";


export class UpdateProjectDto {

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'Project name to update',
		default: 'API Portfolio Project updated'
	})
	name?: string

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'Project description to update',
		default: 'RESTful API built with NestJS and Mongoose. Updated.'
	})

	description?: string

	@IsString()
	@IsOptional()
	@IsUrl()
	@ApiProperty({
		description: 'Project repository or deploy URL to update',
		default: 'https://github.com/tomazcx/portfolio-api'
	})
	url?: string

	@IsArray()
	@IsString({each: true})
	@IsOptional()
	@ApiProperty({
		description: 'Project tags updated',
		default: ['NestJS', 'Mongoose', 'Typescript', 'Jest', 'Swagger', 'Git']
	})
	tags?: string[]


}
