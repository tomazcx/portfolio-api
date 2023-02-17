import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {VerifyIdMiddleware} from './application/common/middlewares/verify-id.middleware';
import {AuthModule} from './application/auth/modules/auth.module';
import {join} from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';
import {EmailModule} from './application/email/modules/email.module';
import {ProjectsControllersModule} from './application/projects/modules/projects-controllers.module';
import {ThrottlerModule} from '@nestjs/throttler';

@Module({
	imports: [MongooseModule.forRoot(process.env.MONGO_URL), AuthModule, ServeStaticModule.forRoot({
		rootPath: join(__dirname, '..', 'upload')
	}),
		EmailModule,
		ProjectsControllersModule,
	ThrottlerModule.forRoot({
		ttl: 60,
		limit: 10
	})
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(VerifyIdMiddleware)
			.exclude({
				path: '/projects/all/:tag', method: RequestMethod.GET
			})
			.forRoutes('projects/:id')

	}

}
