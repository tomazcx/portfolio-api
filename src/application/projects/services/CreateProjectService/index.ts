import {Inject, Injectable} from "@nestjs/common";
import {Project} from "src/domain/projects/entities/project.entity";
import {AbstractCreateProjectService} from "src/domain/projects/services/abstract-create-project.service";
import {ProjectsRepository} from "src/infra/db/repositories/projects.repository";
import {CreateProjectDto} from "../../dto/create-project.dto";

@Injectable()
export class CreateProjectService implements AbstractCreateProjectService {

	@Inject()
	private projectsRepository: ProjectsRepository

	public async execute(createProjectDto: CreateProjectDto): Promise<Project> {
		const project = await this.projectsRepository.create(createProjectDto)
		return project
	}

}
