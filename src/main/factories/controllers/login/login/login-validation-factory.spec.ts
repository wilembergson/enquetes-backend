import { EmailValidation, RequiredFieldValidation, ValidationComposite } from "../../../../../validation/validators"
import { Validation } from "../../../../../presentation/protocols/validation"
import { EmailValidator } from "../../../../../validation/protocols/email-validator"
import { makeLoginValidation } from "./login-validation-factory"

jest.mock('../../../../../validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  return emailValidatorStub
}

describe('loginValidation Factory', () => {
  it('shoul call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})