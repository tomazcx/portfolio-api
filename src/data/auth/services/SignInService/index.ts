import {generateJwt} from "src/application/auth/utils/generate-jwt.util";
import {BadRequestError} from "src/application/common/errors/types/BadRequestError";
import {AuthResponse} from "src/domain/auth/entities/AuthResponse";
import {AbstractSignInService} from "src/domain/auth/services/abstract-sign-in.service";
import {SignInDto} from "../../dto/sign-in.dto";

export class SignInService implements AbstractSignInService {

	public async execute({user, password}: SignInDto): Promise<AuthResponse> {

		if (user !== process.env.USER_LOGIN || password !== process.env.USER_PASSWORD) {
			throw new BadRequestError('Credenciais inválidas')
		}

		const token = generateJwt()

		return {
			status: 'autheticated',
			token,
			timestamp: new Date()
		}

	}

}
