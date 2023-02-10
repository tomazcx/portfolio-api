import {SendGridService} from "@anchan828/nest-sendgrid";
import {Injectable} from "@nestjs/common";
import {SendEmailDto} from "../../dto/send-email.dto";

@Injectable()
export class SendEmailService {

	constructor(private readonly sendGrid: SendGridService) {}

	public async execute(sendEmailDto: SendEmailDto): Promise<void> {

		await this.sendGrid.send({
			to: 'tomazcx06@gmail.com',
			from: 'tomazcxbusiness@gmail.com',
			subject: sendEmailDto.subject,
			text: `Email from ${sendEmailDto.from}. Sender: ${sendEmailDto.name}\n${sendEmailDto.content}`
		})
	}
}


