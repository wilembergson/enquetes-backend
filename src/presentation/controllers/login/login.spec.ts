import { MissingParamError } from "../../error"
import { badRequest } from "../../helpers/http-helper"
import { LoginController } from "./login"

describe('Login Controller', () => {
  it('should return 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpRespose = await sut.handle(httpRequest)
    expect(httpRespose).toEqual(badRequest(new MissingParamError('email')))
  })
})