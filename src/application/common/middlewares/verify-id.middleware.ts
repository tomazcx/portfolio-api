import {Injectable, NestMiddleware, UnprocessableEntityException} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {isValidObjectId} from 'mongoose';

@Injectable()
export class VerifyIdMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {

		const {id} = req.params

		if (!isValidObjectId(id)) {
			throw new UnprocessableEntityException('Invalid id format')
		}

		next();
	}
}

