import {Body, CACHE_MANAGER, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Cache} from 'cache-manager';
import {CreateProjectDto} from 'src/data/projects/dto/create-project.dto';
import {CreateProjectService} from 'src/data/projects/services/CreateProjectService';


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
