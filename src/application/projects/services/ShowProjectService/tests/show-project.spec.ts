import {NotFoundError} from 'src/application/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {ShowProjectService} from '..'

describe('ShowProjectService', () => {

	let service: ShowProjectService
	let id: string
	let date: Date

	beforeEach(() => {
		service = new ShowProjectService()
		id = uuid()
		date = new Date()
	})

	it('should show all projects', async () => {

		const expectedResult = {
			id,
			name: 'test-project',
			description: 'test-description',
			url: 'test-url',
			image: 'test-image',
			tags: ['test-tag'],
			created_at: date,
			updated_at: date
		}

		const mockProjectsRepository = {
			findOne: jest.fn().mockReturnValue(expectedResult)
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		const result = await service.execute(id)

		expect(mockProjectsRepository.findOne).toBeCalled()
		expect(result).toStrictEqual(expectedResult)
	})

	it('should fail due to inexistent id', async () => {
		const mockProjectsRepository = {
			findOne: jest.fn().mockReturnValue(undefined)
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		await expect(service.execute(id)).rejects.toThrow(NotFoundError)
		expect(mockProjectsRepository.findOne).toBeCalled()
	})


})
