import {Project} from "../entities/project.entity";

export abstract class AbstractUpdateImageService {
	abstract execute(id: string, fileName: string): Promise<Project>
}
