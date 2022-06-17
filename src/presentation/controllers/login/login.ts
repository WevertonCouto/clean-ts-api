import { MissingParamError } from '../../errors'
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

    this.emailValidator.isValid(httpRequest.body.email)

    return Promise.resolve(ok({}))
  }
}
