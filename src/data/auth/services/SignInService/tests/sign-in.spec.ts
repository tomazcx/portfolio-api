import {SignInService} from ".."
import 'dotenv/config'

describe('SignInService', () => {

	let service: SignInService

	beforeEach(() => {
		service = new SignInService()
	})

	it('should authenticate', async () => {
		const sigInDto = {
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		}

		const response = await service.execute(sigInDto)

		expect(response).toHaveProperty('token')
	})

})
