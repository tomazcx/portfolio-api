import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CreateProjectService} from 'src/data/projects/services/CreateProjectService';
import {DeleteProjectService} from 'src/data/projects/services/DeleteProjectService';
import {ShowAllProjectsByTagService} from 'src/data/projects/services/ShowAllProjectsByTagService';
import {ShowAllProjectsService} from 'src/data/projects/services/ShowAllProjectsService';
import {ShowProjectService} from 'src/data/projects/services/ShowProjectService';
import {UpdateImageService} from 'src/data/projects/services/UpdateImageService';
import {UpdateProjectService} from 'src/data/projects/services/UpdateProjectService';
import {ProjectsRepository} from 'src/infra/db/repositories/projects.repository';
import {ProjectsSchema} from 'src/infra/db/schemas/projects.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Project',
				schema: ProjectsSchema
			}
		])
	],
	providers: [ProjectsRepository, CreateProjectService, ShowAllProjectsService, ShowAllProjectsByTagService, ShowProjectService, UpdateProjectService, DeleteProjectService, UpdateImageService],
	exports: [CreateProjectService, ShowAllProjectsService, ShowAllProjectsByTagService, ShowProjectService, UpdateProjectService, DeleteProjectService, UpdateImageService]
})
export class ProjectsServicesModule {}
