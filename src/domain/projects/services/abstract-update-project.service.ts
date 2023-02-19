import {UpdateProjectDto} from "src/data/projects/dto/update-project.dto";
import {Project} from "../entities/project.entity";

export abstract class AbstractUpdateProjectService {
	abstract execute(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>
}
