import {DeleteProjectService} from ".."
import {v4 as uuid} from 'uuid'
import {NotFoundError} from "src/application/common/errors/types/NotFoundError"

describe('DeleteProjectService', () => {

	let service: DeleteProjectService
	let id: string

	beforeEach(() => {
		service = new DeleteProjectService()
		id = uuid()
	})


	it('should delete a existing project', async () => {
		const mockProjectsRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(true)),
			delete: jest.fn().mockReturnValue(Promise.resolve())
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		await service.execute(id)

		expect(mockProjectsRepository.exists).toBeCalled()
		expect(mockProjectsRepository.delete).toBeCalled()
	})

	it('should throw a not found error due to inexistent id', async () => {
		const mockProjectsRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		await expect(service.execute(id)).rejects.toBeInstanceOf(NotFoundError)
		expect(mockProjectsRepository.exists).toBeCalled()

	})

})
