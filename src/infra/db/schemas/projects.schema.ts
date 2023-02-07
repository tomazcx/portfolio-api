import {Schema} from "mongoose";

export const ProjectsSchema = new Schema({
	name: String,
	description: String,
	url: String,
	image: String,
	tags: [String]
}, {timestamps: true}
)
