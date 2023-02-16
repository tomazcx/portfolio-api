import {Module} from '@nestjs/common';
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
		ProjectsServicesModule
	],
	controllers: [
		CreateProjectController, DeleteProjectController, UpdateProjectController, ShowProjectController, ShowAllProjectsController, ShowAllProjectsByTagController, UpdateProjectImageController
	]
})
export class ProjectsControllersModule {}
