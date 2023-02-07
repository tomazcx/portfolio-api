import {UpdateImageService} from ".."
import {v4 as uuid} from 'uuid'
import {NotFoundError} from "src/application/common/errors/types/NotFoundError"

describe('UpdateImageService', () => {

	let service: UpdateImageService
	let id: string
	let date: Date

	beforeEach(() => {
		service = new UpdateImageService()
		id = uuid()
		date = new Date()
	})

	it('should update the image field with the name of the uploaded file', async () => {

		const expectedResultFindOne = {
			id,
			name: 'test-project-updated',
			description: 'test-description-updated',
			url: 'test-url',
			tags: ['test-tag'],
			created_at: date,
			updated_at: date

		}

		const expectedResult = {
			id,
			name: 'test-project-updated',
			description: 'test-description-updated',
			url: 'test-url',
			image: 'test-filename.test',
			tags: ['test-tag'],
			created_at: date,
			updated_at: date
		}

		const mockProjectsRepository = {
			findOne: jest.fn().mockReturnValue(expectedResultFindOne),
			updateImage: jest.fn().mockReturnValue(expectedResult)
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		const result = await service.execute(id, 'test-filename.test')

		expect(mockProjectsRepository.updateImage).toBeCalled()
		expect(result).toStrictEqual(expectedResult)

	})

	it('should fail due to inexistent id', async () => {
		const mockProjectsRepository = {
			findOne: jest.fn().mockReturnValue(undefined)
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		await expect(service.execute(id, 'test-filename.test')).rejects.toThrow(NotFoundError)
		expect(mockProjectsRepository.findOne).toBeCalled()
	})


})
