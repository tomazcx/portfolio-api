import {Inject, Injectable} from "@nestjs/common";
import {Project} from "src/domain/projects/entities/project.entity";
import {AbstractShowAllProjectsService} from "src/domain/projects/services/abstract-show-all-projects.service";
import {ProjectsRepository} from "src/infra/db/repositories/projects.repository";

@Injectable()
export class ShowAllProjectsService implements AbstractShowAllProjectsService {

	@Inject()
	private projectsRepository: ProjectsRepository

	public async execute(): Promise<Project[]> {
		const projects = await this.projectsRepository.findAll()
		return projects
	}


} 
