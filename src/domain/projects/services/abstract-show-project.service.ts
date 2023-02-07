import {Project} from "../entities/project.entity";

export abstract class AbstractShowProjectService {
	abstract execute(id: string): Promise<Project>
}
