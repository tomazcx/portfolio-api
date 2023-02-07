import {IsArray, IsNotEmpty, IsString, IsUrl} from "class-validator";

export class CreateProjectDto {

	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	description: string

	@IsString()
	@IsNotEmpty()
	@IsUrl()
	url: string

	@IsString()
	@IsNotEmpty()
	image: string

	@IsArray()
	@IsString({each: true})
	tags: string[]


}
