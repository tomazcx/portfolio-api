import {NotFoundError} from 'src/application/common/errors/types/NotFoundError'
import {v4 as uuid} from 'uuid'
import {UpdateProjectService} from '..'

describe('UpdateProjectService', () => {

	let service: UpdateProjectService
	let id: string
	let date: Date

	beforeEach(() => {
		service = new UpdateProjectService()
		id = uuid()
		date = new Date()
	})

	it('should update the project data', async () => {

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
			exists: jest.fn().mockReturnValue(true),
			update: jest.fn().mockReturnValue(expectedResult)
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		const updateProjectDto = {
			name: 'test-project-updated',
			description: 'test-description-updated',
			url: 'test-url',
			tags: ['test-tag'],

		}

		const result = await service.execute(id, updateProjectDto)

		expect(mockProjectsRepository.exists).toBeCalled()
		expect(mockProjectsRepository.update).toBeCalled()
		expect(result).toStrictEqual(expectedResult)
	})

	it('should fail due to inexistent id', async () => {
		const mockProjectsRepository = {
			exists: jest.fn().mockReturnValue(false)
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		const updateProjectDto = {
			name: 'test-project-updated',
			description: 'test-description-updated',
			url: 'test-url',
			image: 'test-image',
			tags: ['test-tag'],

		}

		await expect(service.execute(id, updateProjectDto)).rejects.toThrow(NotFoundError)
		expect(mockProjectsRepository.exists).toBeCalled()
	})


})
