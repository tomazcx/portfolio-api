import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/application/common/errors/types/NotFoundError";
import {AbstractDeleteProjectService} from "src/domain/projects/services/abstract-delete-project.service";
import {ProjectsRepository} from "src/infra/db/repositories/projects.repository";

@Injectable()
export class DeleteProjectService implements AbstractDeleteProjectService {

	@Inject()
	private projectsRepository: ProjectsRepository

	public async execute(id: string): Promise<void> {
		const projectExists = await this.projectsRepository.exists(id)

		if (!projectExists) {
			throw new NotFoundError('Projeto não encontrado')
		}

		return await this.projectsRepository.delete(id)

	}

}
