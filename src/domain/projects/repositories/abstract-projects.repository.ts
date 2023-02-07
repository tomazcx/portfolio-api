import {CreateProjectDto} from "src/application/projects/dto/create-project.dto";
import {UpdateProjectDto} from "src/application/projects/dto/update-project.dto";
import {Project} from "../entities/project.entity";

export abstract class AbstractProjectsRepository {
	abstract exists(id: string): Promise<boolean>
	abstract findAll(): Promise<Project[]>
	abstract findAllByTag(tag: string): Promise<Project[]>
	abstract findOne(id: string): Promise<Project>
	abstract create(createProjectDto: CreateProjectDto): Promise<Project>
	abstract update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>
	abstract delete(id: string): Promise<void>
}
