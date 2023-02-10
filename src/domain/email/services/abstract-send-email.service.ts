import {SendEmailDto} from "src/application/email/dto/send-email.dto";

export abstract class AbstractSendEmailService {
	abstract execute(sendEmailDto: SendEmailDto): Promise<void>
}
