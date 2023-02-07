import {ObjectId} from "mongoose"

export class Project extends Document {
	name: string
	description: string
	url: string
	image: string
	tags: ObjectId[]
	created_at: Date
	updated_at: Date
}
