import {DeleteProjectService} from ".."
import {v4 as uuid} from 'uuid'
import {NotFoundError} from "src/application/common/errors/types/NotFoundError"

describe('DeleteProjectService', () => {

	let service: DeleteProjectService
	let id: string
	let date: Date

	beforeEach(() => {
		service = new DeleteProjectService()
		id = uuid()
		date = new Date()
	})


	it('should delete a existing project', async () => {

		const expectedResult = {
			id,
			name: 'test-project-updated',
			description: 'test-description-updated',
			url: 'test-url',
			tags: ['test-tag'],
			created_at: date,
			updated_at: date
		}
		const mockProjectsRepository = {
			findOne: jest.fn().mockReturnValue(Promise.resolve(expectedResult)),
			delete: jest.fn().mockReturnValue(Promise.resolve())
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		await service.execute(id)

		expect(mockProjectsRepository.findOne).toBeCalled()
		expect(mockProjectsRepository.delete).toBeCalled()
	})

	it('should throw a not found error due to inexistent id', async () => {

		const mockProjectsRepository = {
			findOne: jest.fn().mockReturnValue(Promise.resolve(undefined))
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		await expect(service.execute(id)).rejects.toBeInstanceOf(NotFoundError)
		expect(mockProjectsRepository.findOne).toBeCalled()

	})

})
