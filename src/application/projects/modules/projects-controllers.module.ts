import {CacheModule, Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import {ThrottlerGuard} from '@nestjs/throttler';
import {redisStore} from 'cache-manager-redis-store';
import {RedisClientOptions} from 'redis';
import {AuthModule} from 'src/application/auth/modules/auth.module';
import {CreateProjectController} from '../controllers/create-project.controller';
import {DeleteProjectController} from '../controllers/delete-project.controller';
import {ShowAllProjectsByTagController} from '../controllers/show-all-projects-by-tag.controller';
import {ShowAllProjectsController} from '../controllers/show-all-projects.controller';
import {ShowProjectController} from '../controllers/show-project.controller';
import {UpdateProjectImageController} from '../controllers/update-project-image.controller';
import {UpdateProjectController} from '../controllers/update-project.controller';
import {ProjectsServicesModule} from './projects-services.module';

@Module({
	imports: [
		ProjectsServicesModule,
		AuthModule,
		CacheModule.register<RedisClientOptions>({
			//@ts-ignore
			store: async () => await redisStore({
				socket: {
					host: 'redis',
					port: 6379

				}
			}),
		})
	],
	controllers: [
		CreateProjectController, DeleteProjectController, UpdateProjectController, ShowProjectController, ShowAllProjectsController, ShowAllProjectsByTagController, UpdateProjectImageController
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard
		}
	]
})
export class ProjectsControllersModule {}
