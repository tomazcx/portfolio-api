import {Inject, Injectable} from "@nestjs/common";
import {Project} from "src/domain/projects/entities/project.entity";
import {AbstractShowAllProjectsByTagService} from "src/domain/projects/services/abstract-show-projects-by-tag.service";
import {ProjectsRepository} from "src/infra/db/repositories/projects.repository";

@Injectable()
export class ShowAllProjectsByTagService implements AbstractShowAllProjectsByTagService {

	@Inject()
	private projectsRepository: ProjectsRepository

	public async execute(tag: string): Promise<Project[]> {
		const projects = await this.projectsRepository.findAllByTag(tag)
		return projects
	}


}
