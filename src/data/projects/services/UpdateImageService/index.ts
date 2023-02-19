import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/application/common/errors/types/NotFoundError";
import {Project} from "src/domain/projects/entities/project.entity";
import {AbstractUpdateImageService} from "src/domain/projects/services/abstract-update-image.service";
import {ProjectsRepository} from "src/infra/db/repositories/projects.repository";
import {deleteImage} from "../../utils/delete-image.util";

@Injectable()
export class UpdateImageService implements AbstractUpdateImageService {

	@Inject()
	private projectsRepository: ProjectsRepository

	public async execute(id: string, fileName: string): Promise<Project> {
		const project = await this.projectsRepository.findOne(id)

		if (!project) {
			throw new NotFoundError('Projeto não encontrado')
		}

		if (project.image) {
			deleteImage(project.image)
		}

		const updatedProject = await this.projectsRepository.updateImage(id, fileName)

		return updatedProject
	}

}
