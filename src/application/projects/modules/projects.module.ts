import {CacheModule, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {redisStore} from 'cache-manager-redis-store';
import {RedisClientOptions} from 'redis';
import {AuthModule} from 'src/application/auth/modules/auth.module';
import {ProjectsSchema} from 'src/infra/db/schemas/projects.schema';
import {ProjectsController} from '../controllers/projects.controller';
import {ProjectsControllersModule} from './projects-controllers.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Project',
				schema: ProjectsSchema
			}
		]),
		AuthModule,
		CacheModule.register<RedisClientOptions>({
			//@ts-ignore
			store: async () => await redisStore({
				socket: {
					host: 'redis',
					port: 6379

				}
			}),
		}),
		ProjectsControllersModule
	],
	controllers: [ProjectsController],
})
export class ProjectsModule {}
