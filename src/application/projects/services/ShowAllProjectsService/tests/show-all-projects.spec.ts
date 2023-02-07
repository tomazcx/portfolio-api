import {v4 as uuid} from 'uuid'
import {ShowAllProjectsService} from '..'


describe('ShowAllProjectsService', () => {

	let service: ShowAllProjectsService
	let id: string
	let date: Date

	beforeEach(() => {
		service = new ShowAllProjectsService()
		id = uuid()
		date = new Date()
	})

	it('should show all projects', async () => {

		const expectedResult = [
			{
				id,
				name: 'test-project',
				description: 'test-description',
				url: 'test-url',
				image: 'test-image',
				tags: ['test-tag'],
				created_at: date,
				updated_at: date
			}
		]


		const mockProjectsRepository = {
			findAll: jest.fn().mockReturnValue(expectedResult)
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		const result = await service.execute()

		expect(mockProjectsRepository.findAll).toBeCalled()
		expect(result).toStrictEqual(expectedResult)
	})


})
