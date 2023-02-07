import {ObjectId} from "mongoose"

export class Project extends Document {
	_id: string
	name: string
	description: string
	url: string
	image: string
	tags: ObjectId[]
	createdAt: Date
	updatedAt: Date
}
