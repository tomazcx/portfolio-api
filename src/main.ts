import 'dotenv/config'
import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NotFoundInterceptor} from './application/common/errors/interceptors/not-found.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true
	}))

	app.useGlobalInterceptors(new NotFoundInterceptor())

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
