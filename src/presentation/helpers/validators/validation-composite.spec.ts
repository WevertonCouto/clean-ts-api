import { MissingParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'
import {} from '../../errors/missing-param-error'
import { Validation } from './validation'

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return new MissingParamError('field')
      }
    }

    const sut = new ValidationComposite([
      new ValidationStub()
    ])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
