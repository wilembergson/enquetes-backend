import { AccountModel } from "../../domain/model/account"
import { LoadAccountByToken } from "../../domain/use-cases/load-account-by-token"
import { AccessDeniedError } from "../error"
import { forbidden } from "../helpers/http/http-helper"
import { AuthMiddleware } from "./auth-middleware"

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'any_email@gmail',
    password: 'hashed_password',
  })

describe('Auth middleware', () => {
    it('should return 403 if no x-access-token exists in header', async () => {
        class LoadAccountByTokenStub implements LoadAccountByToken{
            load(accessToken: string, role?: string): Promise<AccountModel> {
                return new Promise(resolve => resolve(makeFakeAccount()))
            }
        }
        const loadAccountByTokenStub = new LoadAccountByTokenStub()
        const sut = new AuthMiddleware(loadAccountByTokenStub)
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    it('should call LoadAccountByToken with correct accessToken', async () => {
        class LoadAccountByTokenStub implements LoadAccountByToken{
            load(accessToken: string, role?: string): Promise<AccountModel> {
                return new Promise(resolve => resolve(makeFakeAccount()))
            }
        }
        const loadAccountByTokenStub = new LoadAccountByTokenStub()
        const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
        const sut = new AuthMiddleware(loadAccountByTokenStub)
        await sut.handle({
            headers: {
                'x-access-token': 'any_token'
            }
        })
        expect(loadSpy).toHaveBeenCalledWith('any_token')
    })
})