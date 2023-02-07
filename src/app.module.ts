import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProjectsModule} from './application/projects/modules/projects.module';

@Module({
	imports: [MongooseModule.forRoot(process.env.MONGO_URL), ProjectsModule]
})
export class AppModule {}
