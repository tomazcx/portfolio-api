import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {SignInDto} from '../dto/sign-in.dto';
import {SignInService} from '../services/SignInService';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

	constructor(
		private readonly signInService: SignInService
	) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: 400,
		description: 'Invalid credentials'
	})
	async signin(@Body() signInDto: SignInDto) {
		return this.signInService.execute(signInDto)
	}

}
