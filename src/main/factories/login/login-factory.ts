import { DbAuthentication } from "../../../data/use-cases/authentication/db-authentication"
import { BCryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter"
import { JwtAdapter } from "../../../infra/criptography/jwt-adapter/jwt-adapter"
import { AccountMongoRepository } from "../../../infra/db/mongodb/account/account-mongo-repository"
import { LoginController } from "../../../presentation/controllers/login/login-controller"
import { makeLoginValidation } from "./login-validation-factory"
import { Controller } from "../../../presentation/protocols"
import { LogMongoRepository } from "../../../infra/db/mongodb/log/log-mongo-repository"
import { LogControllerDecorator } from "../../decorators/log-controller-decorator"
import env from "../../config/env"

export const makeLoginController = (): Controller => {
    const salt = 12
    const bcryptAdapter = new BCryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
    const loginController = new LoginController(dbAuthentication, makeLoginValidation())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(loginController, logMongoRepository)
}