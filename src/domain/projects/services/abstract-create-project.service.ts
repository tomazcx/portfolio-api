import {CreateProjectDto} from "src/data/projects/dto/create-project.dto";
import {Project} from "../entities/project.entity";

export abstract class AbstractCreateProjectService {
	abstract execute(createProject: CreateProjectDto): Promise<Project>
}
