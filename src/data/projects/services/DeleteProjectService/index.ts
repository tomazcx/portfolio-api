import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/application/common/errors/types/NotFoundError";
import {AbstractDeleteProjectService} from "src/domain/projects/services/abstract-delete-project.service";
import {ProjectsRepository} from "src/infra/db/repositories/projects.repository";
import {deleteImage} from "../../utils/delete-image.util";

@Injectable()
export class DeleteProjectService implements AbstractDeleteProjectService {

	@Inject()
	private projectsRepository: ProjectsRepository

	public async execute(id: string): Promise<void> {
		const project = await this.projectsRepository.findOne(id)

		if (!project) {
			throw new NotFoundError('Projeto não encontrado')
		}

		if (project.image) {
			deleteImage(project.image)
		}


		return await this.projectsRepository.delete(id)

	}

}
