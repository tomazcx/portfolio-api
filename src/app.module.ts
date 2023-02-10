import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {VerifyIdMiddleware} from './application/common/middlewares/verify-id.middleware';
import {ProjectsModule} from './application/projects/modules/projects.module';
import {AuthModule} from './application/auth/modules/auth.module';
import {join} from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';
import {EmailModule} from './application/email/modules/email.module';

@Module({
	imports: [MongooseModule.forRoot(process.env.MONGO_URL), ProjectsModule, AuthModule, ServeStaticModule.forRoot({
		rootPath: join(__dirname, '..', 'upload')
	}),
		EmailModule
	],

})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(VerifyIdMiddleware)
			.exclude({
				path: 'projects/all', method: RequestMethod.GET
			})
			.forRoutes('projects/:id')

	}

}
