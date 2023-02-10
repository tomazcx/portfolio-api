import {SendGridModule} from '@anchan828/nest-sendgrid';
import {Module} from '@nestjs/common';
import {EmailController} from '../controllers/email.controller';
import {SendEmailService} from '../services/SendEmailService';

@Module({
	imports: [
		SendGridModule.forRoot({
			apikey: process.env.SENDGRID_KEY
		})
	],
	controllers: [EmailController],
	providers: [SendEmailService]
})
export class EmailModule {}
