import * as fs from 'fs'
import * as path from 'path'

export const deleteImage = (image: string) => {
	return fs.unlink(path.resolve(__dirname, '../', '../', '../', '../upload', image), (err) => {
		console.log(err)
	})
}
