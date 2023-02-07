import {Project} from "../entities/project.entity";

export abstract class AbstractShowAllProjectsByTagService {
	abstract execute(tag: string): Promise<Project[]>
}
