import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateProjectDto} from "src/application/projects/dto/create-project.dto";
import {UpdateProjectDto} from "src/application/projects/dto/update-project.dto";
import {Project} from "src/domain/projects/entities/project.entity";
import {AbstractProjectsRepository} from "src/domain/projects/repositories/abstract-projects.repository";

@Injectable()
export class ProjectsRepository implements AbstractProjectsRepository {

	@InjectModel('Project')
	private readonly projectsModel: Model<Project>


	public async exists(id: string): Promise<boolean> {
		const project = await this.projectsModel.findById(id)
		return !!project
	}

	public async findAll(): Promise<Project[]> {
		const projects = await this.projectsModel.find()
		return projects
	}

	public async findAllByTag(tag: string): Promise<Project[]> {
		const projects = await this.projectsModel.find({tags: {$in: [tag]}})
		return projects
	}

	public async findOne(id: string): Promise<Project> {
		const project = await this.projectsModel.findById(id)
		return project
	}

	public async create(createProjectDto: CreateProjectDto): Promise<Project> {

		const project = await this.projectsModel.create(createProjectDto)
		return project
	}

	public async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
		await this.projectsModel.updateOne({_id: id}, {$set: updateProjectDto}, {runValidators: true})

		const project = await this.projectsModel.findById(id)
		return project
	}

	public async updateImage(id: string, filename: string): Promise<Project> {
		await this.projectsModel.updateOne({_id: id}, {$set: {image: filename}})
		const project = await this.projectsModel.findById(id)
		return project

	}

	public async delete(id: string): Promise<void> {
		await this.projectsModel.deleteOne({_id: id})
		return
	}



}
