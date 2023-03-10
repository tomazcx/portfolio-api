import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {SignInService} from 'src/data/auth/services/SignInService';
import {AuthController} from '../controllers/auth.controller';
import {JwtStrategy} from '../strategies/jwt.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: process.env.JWT_EXPIRES_IN
			}
		})
	],
	controllers: [AuthController],
	providers: [SignInService, JwtStrategy]
})
export class AuthModule {}
