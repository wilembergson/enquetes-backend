import { DbAddAccount } from "../../../data/use-cases/add-account/db-add-account";
import { BCryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { AccountMongoRepository } from "../../../infra/db/mongodb/account/account-mongo-repository";
import { SignupController } from "../../../presentation/controllers/signup/signup-controller";
import { Controller } from "../../../presentation/protocols";
import { LogControllerDecorator } from "../../decorators/log-controller-decorator";
import { LogMongoRepository } from "../../../infra/db/mongodb/log/log-mongo-repository";
import { makeSignUpValidation } from "./signup-validation-factory";

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignupController(dbAddAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}