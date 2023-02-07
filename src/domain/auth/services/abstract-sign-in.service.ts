import {SignInDto} from "src/application/auth/dto/sign-in.dto";
import {AuthResponse} from "../entities/AuthResponse";

export abstract class AbstractSignInService {
	abstract execute(signInDto: SignInDto): Promise<AuthResponse>
}
