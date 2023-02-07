import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProjectsRepository} from 'src/infra/db/repositories/projects.repository';
import {ProjectsSchema} from 'src/infra/db/schemas/projects.schema';
import {ProjectsController} from '../controllers/projects.controller';
import {CreateProjectService} from '../services/CreateProjectService';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Project',
				schema: ProjectsSchema
			}
		])
	],
	controllers: [ProjectsController],
	providers: [ProjectsRepository, CreateProjectService]
})
export class ProjectsModule {}
