import {Project} from "../entities/project.entity";

export abstract class AbstractShowAllProjectsService {
	abstract execute(): Promise<Project[]>
}
