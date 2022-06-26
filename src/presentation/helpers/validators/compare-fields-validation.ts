import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareName: string) {}

  validate (input: any): Error | null {
    if (input[this.fieldToCompareName] !== input[this.fieldName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
    return null
  }
}
