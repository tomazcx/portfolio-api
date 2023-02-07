import {sign} from "jsonwebtoken"

export const generateJwt = (): string => {
	return sign({}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	})
}
