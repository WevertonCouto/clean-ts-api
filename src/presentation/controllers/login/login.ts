import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { Authentication } from '../../../domain/usecases/authentication'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidadtor: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidadtor
    this.authentication = authentication
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

      await this.authentication.auth(email, password)

      return Promise.resolve(ok({}))
    } catch (error) {
      return serverError(error)
    }
  }
}
