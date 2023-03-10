import { MissingParamError } from "../../presentation/error"
import { RequiredFieldValidation } from "./required-field-validation"

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  it('should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'field' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})