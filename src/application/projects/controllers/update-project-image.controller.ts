import {CACHE_MANAGER, Controller, HttpCode, HttpStatus, Inject, Param, Patch, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {AuthGuard} from '@nestjs/passport';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import * as path from 'path';
import {UpdateImageService} from 'src/data/projects/services/UpdateImageService';

@ApiTags('Projects')
@Controller('projects')
export class UpdateProjectImageController {

	constructor(
		private readonly updateImageService: UpdateImageService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}

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
	async handle(@Param('id') id: string, @UploadedFile() image: Express.Multer.File) {
		this.cacheManager.reset()
		return await this.updateImageService.execute(id, image.filename)
	}

}
