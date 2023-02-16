import {Body, CACHE_MANAGER, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiOkResponse, ApiResponse, ApiTags} from '@nestjs/swagger';
import {diskStorage} from 'multer';
import * as path from 'path';
import {CreateProjectDto} from '../dto/create-project.dto';
import {UpdateProjectDto} from '../dto/update-project.dto';
import {CreateProjectService} from '../services/CreateProjectService';
import {DeleteProjectService} from '../services/DeleteProjectService';
import {ShowAllProjectsByTagService} from '../services/ShowAllProjectsByTagService';
import {ShowAllProjectsService} from '../services/ShowAllProjectsService';
import {ShowProjectService} from '../services/ShowProjectService';
import {UpdateImageService} from '../services/UpdateImageService';
import {UpdateProjectService} from '../services/UpdateProjectService';
import {Cache} from 'cache-manager';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {

	constructor(
		private readonly showAllProjectsService: ShowAllProjectsService,
		private readonly showAllProjectsByTagService: ShowAllProjectsByTagService,
		private readonly showProjectService: ShowProjectService,
		private readonly createProjectService: CreateProjectService,
		private readonly updateProjectService: UpdateProjectService,
		private readonly deleteProjectService: DeleteProjectService,
		private readonly updateImageService: UpdateImageService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}

	@Get('/all')
	@HttpCode(HttpStatus.OK)
	async findAll() {

		let data = await this.cacheManager.get("ALL-PROJECTS")

		if (data) {
			return JSON.parse(data as string)
		}

		data = await this.showAllProjectsService.execute()
		await this.cacheManager.set('ALL-PROJECTS', JSON.stringify(data))

		return data
	}

	@Get('/all/:tag')
	@HttpCode(HttpStatus.OK)
	async findAllByTag(@Param('tag') tag: string) {
		let data = await this.cacheManager.get(`PROJECTS-BY-TAG-${tag}`)

		if (data) {
			return JSON.parse(data as string)
		}

		data = await this.showAllProjectsByTagService.execute(tag)
		await this.cacheManager.set(`PROJECTS-BY-TAG-${tag}`, JSON.stringify(data))

		return data
	}

	@Get('/:id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: 400,
		description: 'Invalid id format'
	})
	@ApiResponse({
		status: 404,
		description: 'Project not found'
	})

	async findById(@Param('id') id: string) {

		let data = await this.cacheManager.get(`PROJECT-${id}`)

		if (data) {
			return JSON.parse(data as string)
		}

		data = await this.showProjectService.execute(id)
		await this.cacheManager.set(`PROJECT-${id}`, JSON.stringify(data))

		return data
	}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.CREATED)
	@ApiResponse({
		status: 400,
		description: 'Invalid fields'
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized'
	})
	async create(@Body() createProjectDto: CreateProjectDto) {
		this.cacheManager.reset()
		return this.createProjectService.execute(createProjectDto)
	}

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: 400,
		description: 'Invalid id format'
	})
	@ApiResponse({
		status: 404,
		description: 'Project not found'
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized'
	})
	async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
		this.cacheManager.reset()
		return this.updateProjectService.execute(id, updateProjectDto)
	}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiResponse({
		status: 400,
		description: 'Invalid id format'
	})
	@ApiResponse({
		status: 404,
		description: 'Project not found'
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized'
	})
	async delete(@Param('id') id: string) {
		this.cacheManager.reset()
		return this.deleteProjectService.execute(id)
	}

	@Patch('/:id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: 400,
		description: 'Invalid id format'
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized'
	})
	@ApiResponse({
		status: 404,
		description: 'Project not found'
	})
	@UseInterceptors(FileInterceptor('image', {
		storage: diskStorage({
			destination: path.resolve(__dirname, '../', '../', '../', '../upload'),
			filename: (req, file, callback) => {
				const uniqueSufix = Date.now() + '-' + Math.round(Math.random() * 1e9)
				const ext = path.extname(file.originalname)
				const filename = `${uniqueSufix}${ext}`
				callback(null, filename)
			}
		})
	}))
	async uploadImage(@Param('id') id: string, @UploadedFile() image: Express.Multer.File) {
		this.cacheManager.reset()
		return await this.updateImageService.execute(id, image.filename)
	}


}
