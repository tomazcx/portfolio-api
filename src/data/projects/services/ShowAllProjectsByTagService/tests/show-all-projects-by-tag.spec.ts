import {v4 as uuid} from 'uuid'
import {ShowAllProjectsByTagService} from '..'

describe('ShowAllProjectsByTagService', () => {

	let service: ShowAllProjectsByTagService
	let id: string
	let date: Date

	beforeEach(() => {
		service = new ShowAllProjectsByTagService()
		id = uuid()
		date = new Date()
	})

	it('should show all projects with the informed tag', async () => {

		const expectedResult = [
			{
				name: 'test-project',
				description: 'test-description',
				url: 'test-url',
				image: 'test-image',
				tags: ['test-tag']
			}
		]


		const mockProjectsRepository = {
			findAllByTag: jest.fn().mockReturnValue(expectedResult)
		}

		//@ts-expect-error defined part of methods
		service['projectsRepository'] = mockProjectsRepository

		const result = await service.execute('test-tag')

		expect(mockProjectsRepository.findAllByTag).toBeCalled()
		expect(result).toStrictEqual(expectedResult)
	})


})
