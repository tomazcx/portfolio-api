import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {SendEmailDto} from '../dto/send-email.dto';
import {SendEmailService} from '../services/SendEmailService';

@Controller('email')
@ApiTags('Email')
export class EmailController {

	constructor(
		private readonly sendEmailService: SendEmailService
	) {}

	@Post()
	@HttpCode(HttpStatus.NO_CONTENT)
	async sendEmail(@Body() sendEmailDto: SendEmailDto) {
		return this.sendEmailService.execute(sendEmailDto)
	}


}
