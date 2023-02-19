import {CACHE_MANAGER, Controller, Get, HttpCode, HttpStatus, Inject, Param} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {ShowProjectService} from 'src/data/projects/services/ShowProjectService';

@ApiTags('Projects')
@Controller('projects')
export class ShowProjectController {

	constructor(
		private readonly showProjectService: ShowProjectService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}

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

	async handle(@Param('id') id: string) {

		let data = await this.cacheManager.get(`PROJECT-${id}`)

		if (data) {
			return JSON.parse(data as string)
		}

		data = await this.showProjectService.execute(id)
		await this.cacheManager.set(`PROJECT-${id}`, JSON.stringify(data))

		return data
	}


}
