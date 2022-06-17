import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidadtor: EmailValidator) {
    this.emailValidator = emailValidadtor
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return Promise.resolve(badRequest(new MissingParamError('email')))
    }
    if (!httpRequest.body.password) {
      return Promise.resolve(badRequest(new MissingParamError('password')))
    }

    var isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) return Promise.resolve(badRequest(new InvalidParamError('email')))

    return Promise.resolve(ok({}))
  }
}
