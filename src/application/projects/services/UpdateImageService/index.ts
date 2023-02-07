import {Inject, Injectable} from "@nestjs/common";
import {NotFoundError} from "src/application/common/errors/types/NotFoundError";
import {Project} from "src/domain/projects/entities/project.entity";
import {AbstractUpdateImageService} from "src/domain/projects/services/abstract-update-image.service";
import {ProjectsRepository} from "src/infra/db/repositories/projects.repository";
import * as fs from 'fs'
import * as path from "path";

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
			fs.unlink(path.resolve(__dirname, '../', '../', '../', '../', '../upload', project.image), (err) => {
				console.log(err)
			})
		}

		const updatedProject = await this.projectsRepository.updateImage(id, fileName)

		return updatedProject
	}

}
