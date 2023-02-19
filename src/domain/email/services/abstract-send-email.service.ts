import {SendEmailDto} from "src/data/email/dto/send-email.dto";

export abstract class AbstractSendEmailService {
	abstract execute(sendEmailDto: SendEmailDto): Promise<void>
}
