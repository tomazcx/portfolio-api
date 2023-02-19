import {SendGridModule} from '@anchan828/nest-sendgrid';
import {Module} from '@nestjs/common';
import {SendEmailService} from 'src/data/email/services/SendEmailService';
import {EmailController} from '../controllers/email.controller';

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
