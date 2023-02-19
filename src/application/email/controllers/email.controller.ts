import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Throttle} from '@nestjs/throttler';
import {SendEmailDto} from 'src/data/email/dto/send-email.dto';
import {SendEmailService} from 'src/data/email/services/SendEmailService';

@Controller('email')
@ApiTags('Email')
export class EmailController {

	constructor(
		private readonly sendEmailService: SendEmailService
	) {}

	@Throttle(1, 20)
	@Post()
	@HttpCode(HttpStatus.NO_CONTENT)
	async sendEmail(@Body() sendEmailDto: SendEmailDto) {
		return this.sendEmailService.execute(sendEmailDto)
	}


}
