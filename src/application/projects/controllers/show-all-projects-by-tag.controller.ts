import {Controller, Get, HttpCode, HttpStatus, Inject, Param} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ShowAllProjectsByTagService} from '../services/ShowAllProjectsByTagService';
import {Cache} from 'cache-manager';

@ApiTags('Projects')
@Controller('projects')
export class ShowAllProjectsByTagController {

	constructor(
		private readonly showAllProjectsByTagService: ShowAllProjectsByTagService,
		@Inject('CACHE_MANAGER') private cacheManager: Cache
	) {}

	@Get('/all/:tag')
	@HttpCode(HttpStatus.OK)
	async handle(@Param('tag') tag: string) {
		let data = await this.cacheManager.get(`PROJECTS-BY-TAG-${tag}`)

		if (data) {
			return JSON.parse(data as string)
		}

		data = await this.showAllProjectsByTagService.execute(tag)
		await this.cacheManager.set(`PROJECTS-BY-TAG-${tag}`, JSON.stringify(data))

		return data
	}


}
