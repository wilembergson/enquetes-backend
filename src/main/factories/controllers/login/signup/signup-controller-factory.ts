import { Controller } from "../../../../../presentation/protocols";
import { makeSignUpValidation } from "./signup-validation-factory";
import { makeDbAddAccount } from "../../../usecases/account/add-account/db-add-account-factory";
import { makeLogControllerDecorator } from "../../../decorators/log-controller-decorator-factory";
import { SignupController } from "../../../../../presentation/controllers/login/signup/signup-controller";
import { makeDbAuthentication } from "../../../usecases/account/authentication/db-authentication-factory";

export const makeSignUpController = (): Controller => {
  const controller = new SignupController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}