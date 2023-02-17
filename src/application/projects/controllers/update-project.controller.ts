import {Body, CACHE_MANAGER, Controller, HttpCode, HttpStatus, Inject, Param, Put, UseGuards} from '@nestjs/common';
import {UpdateProjectService} from '../services/UpdateProjectService';
import {Cache} from 'cache-manager';
import {AuthGuard} from '@nestjs/passport';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {UpdateProjectDto} from '../dto/update-project.dto';

@ApiTags('Projects')
@Controller('projects')
export class UpdateProjectController {

	constructor(
		private readonly updateProjectService: UpdateProjectService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}


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
	async handle(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
		this.cacheManager.reset()
		return this.updateProjectService.execute(id, updateProjectDto)
	}

}
