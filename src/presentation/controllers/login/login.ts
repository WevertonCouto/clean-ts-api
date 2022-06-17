import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidadtor: EmailValidator) {
    this.emailValidator = emailValidadtor
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return Promise.resolve(badRequest(new MissingParamError('email')))
      }
      if (!password) {
        return Promise.resolve(badRequest(new MissingParamError('password')))
      }

      var isValid = this.emailValidator.isValid(email)
      if (!isValid) return Promise.resolve(badRequest(new InvalidParamError('email')))

      return Promise.resolve(ok({}))
    } catch (error) {
      return serverError(error)
    }
  }
}
