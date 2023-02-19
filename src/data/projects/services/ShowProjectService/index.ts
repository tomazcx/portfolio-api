import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/application/common/errors/types/NotFoundError";
import {Project} from "src/domain/projects/entities/project.entity";
import {AbstractShowProjectService} from "src/domain/projects/services/abstract-show-project.service";
import {ProjectsRepository} from "src/infra/db/repositories/projects.repository";

@Injectable()
export class ShowProjectService implements AbstractShowProjectService {

	@Inject()
	private projectsRepository: ProjectsRepository

	public async execute(id: string): Promise<Project> {
		const project = await this.projectsRepository.findOne(id)

		if (!project) {
			throw new NotFoundError('Projeto não encontrado')
		}

		return project
	}

}
