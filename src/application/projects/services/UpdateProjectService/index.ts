import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/application/common/errors/types/NotFoundError";
import {Project} from "src/domain/projects/entities/project.entity";
import {AbstractUpdateProjectService} from "src/domain/projects/services/abstract-update-project.service";
import {ProjectsRepository} from "src/infra/db/repositories/projects.repository";
import {UpdateProjectDto} from "../../dto/update-project.dto";

@Injectable()
export class UpdateProjectService implements AbstractUpdateProjectService {

	@Inject()
	private projectsRepository: ProjectsRepository

	public async execute(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
		const projectExists = await this.projectsRepository.exists(id)

		if (!projectExists) {
			throw new NotFoundError('Projeto não encontrado')
		}

		const updatedProject = await this.projectsRepository.update(id, updateProjectDto)
		return updatedProject
	}

}
