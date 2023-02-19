import 'dotenv/config'
import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NotFoundInterceptor} from './application/common/errors/interceptors/not-found.interceptor';
import {BadRequestInterceptor} from './application/common/errors/interceptors/bad-request.interceptor';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true
	}))

	app.useGlobalInterceptors(new NotFoundInterceptor())
	app.useGlobalInterceptors(new BadRequestInterceptor())

	const config = new DocumentBuilder()
		.setTitle('Portfolio API')
		.setDescription('An API RESTful built with NestJS and Mongoose for my portfolio. It has all the CRUD services to register and manage projects, who are shown on my Portfolio Web Page.')
		.setVersion('1.0')
		.addTag('Projects')
		.addTag('Auth')
		.addTag('Email')
		.build()

	app.enableCors()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
