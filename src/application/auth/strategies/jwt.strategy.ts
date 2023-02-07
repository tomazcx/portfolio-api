import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from 'passport-jwt'
import {ExtractJWT} from "../utils/extract-jwt.util";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor() {
		super({
			jwtFromRequest: ExtractJWT,
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET
		})
	}

	async validate() {
		return true
	}



}
