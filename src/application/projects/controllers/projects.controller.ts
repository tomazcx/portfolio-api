import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
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
		private readonly updateImageService: UpdateImageService
	) {}

	@Get('/all')
	@HttpCode(HttpStatus.OK)
	async findAll() {
		return this.showAllProjectsService.execute()
	}

	@Get('/all/:tag')
	@HttpCode(HttpStatus.OK)
	async findAllByTag(@Param('tag') tag: string) {
		return this.showAllProjectsByTagService.execute(tag)
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
		return this.showProjectService.execute(id)
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
		return await this.updateImageService.execute(id, image.filename)
	}


}
