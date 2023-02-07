import {CreateProjectService} from ".."
import {v4 as uuid} from 'uuid'

describe('CreateProjectService', () => {

	let service: CreateProjectService
	let id: string
	let tagId: string
	let date: Date

	beforeEach(() => {
		service = new CreateProjectService()
		id = uuid()
		tagId = uuid()
		date = new Date()
	})

	it('should create a new project', async () => {
		const expectedOutputProject = {
			id,
			name: 'test-project',
			description: 'test-description',
			url: 'test-url',
			image: 'test-image.jpg',
			tags: ['test-tag'],
			created_at: date,
			updated_at: date
		}

		const mockProjectsRepository = {
			create: jest.fn().mockReturnValue(Promise.resolve(expectedOutputProject))
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		const createProjecDto = {
			name: 'test-project',
			description: 'test-description',
			url: 'test-url',
			image: 'test-image.jpg',
			tags: ['test-tag']

		}

		const createdProject = await service.execute(createProjecDto)

		expect(mockProjectsRepository.create).toBeCalled()
		expect(createdProject).toStrictEqual(expectedOutputProject)
	})

})
