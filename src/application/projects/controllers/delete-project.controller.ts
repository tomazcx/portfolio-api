import {CACHE_MANAGER, Controller, Delete, HttpCode, HttpStatus, Param, UseGuards} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {Inject} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {DeleteProjectService} from 'src/data/projects/services/DeleteProjectService';

@ApiTags('Projects')
@Controller('projects')
export class DeleteProjectController {

	constructor(
		private readonly deleteProjectService: DeleteProjectService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}

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
	async handle(@Param('id') id: string) {
		this.cacheManager.reset()
		return this.deleteProjectService.execute(id)
	}



}
