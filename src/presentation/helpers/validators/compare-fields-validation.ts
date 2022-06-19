import { InvalidParamError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldsValidation implements Validation {
  private readonly fieldName: string
  private readonly fieldToCompareName: string

  constructor (fieldName: string, fieldToCompareName: string) {
    this.fieldName = fieldName
    this.fieldToCompareName = fieldToCompareName
  }

  validate (input: any): Error | null {
    if (input[this.fieldToCompareName] !== input[this.fieldName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
    return null
  }
}
