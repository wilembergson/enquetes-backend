import { DbAuthentication } from "../../../../data/use-cases/authentication/db-authentication"
import { Authentication } from "../../../../domain/use-cases/authentication"
import { BCryptAdapter } from "../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter"
import { JwtAdapter } from "../../../../infra/criptography/jwt-adapter/jwt-adapter"
import { AccountMongoRepository } from "../../../../infra/db/mongodb/account/account-mongo-repository"
import env from "../../../config/env"

export const makeDbAuthentication = (): Authentication => {
    const salt = 12
    const bcryptAdapter = new BCryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountMongoRepository = new AccountMongoRepository()
    return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}