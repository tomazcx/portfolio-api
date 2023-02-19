import {CACHE_MANAGER, Controller, Get, HttpCode, HttpStatus, Inject} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {ApiTags} from '@nestjs/swagger';
import {ShowAllProjectsService} from 'src/data/projects/services/ShowAllProjectsService';

@ApiTags('Projects')
@Controller('projects')
export class ShowAllProjectsController {

	constructor(
		private readonly showAllProjectsService: ShowAllProjectsService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async handle() {

		let data = await this.cacheManager.get("ALL-PROJECTS")

		if (data) {
			return JSON.parse(data as string)
		}

		data = await this.showAllProjectsService.execute()
		await this.cacheManager.set('ALL-PROJECTS', JSON.stringify(data))

		return data
	}

}
