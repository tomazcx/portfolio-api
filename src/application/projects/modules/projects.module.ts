import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from 'src/application/auth/modules/auth.module';
import {ProjectsRepository} from 'src/infra/db/repositories/projects.repository';
import {ProjectsSchema} from 'src/infra/db/schemas/projects.schema';
import {ProjectsController} from '../controllers/projects.controller';
import {CreateProjectService} from '../services/CreateProjectService';
import {DeleteProjectService} from '../services/DeleteProjectService';
import {ShowAllProjectsByTagService} from '../services/ShowAllProjectsByTagService';
import {ShowAllProjectsService} from '../services/ShowAllProjectsService';
import {ShowProjectService} from '../services/ShowProjectService';
import {UpdateImageService} from '../services/UpdateImageService';
import {UpdateProjectService} from '../services/UpdateProjectService';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Project',
				schema: ProjectsSchema
			}
		]),
		AuthModule
	],
	controllers: [ProjectsController],
	providers: [ProjectsRepository, CreateProjectService, ShowAllProjectsService, ShowAllProjectsByTagService, ShowProjectService, UpdateProjectService, DeleteProjectService, UpdateImageService]
})
export class ProjectsModule {}
