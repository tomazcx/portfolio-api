import {Body, CACHE_MANAGER, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateProjectService} from '../services/CreateProjectService';
import {Cache} from 'cache-manager';
import {CreateProjectDto} from '../dto/create-project.dto';

@ApiTags('Projects')
@Controller('projects')
export class CreateProjectController {

	constructor(
		private readonly createProjectService: CreateProjectService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}

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
	async handle(@Body() createProjectDto: CreateProjectDto) {
		this.cacheManager.reset()
		return this.createProjectService.execute(createProjectDto)
	}


}
