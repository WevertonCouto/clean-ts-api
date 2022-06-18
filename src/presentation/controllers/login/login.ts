import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unhauthorized } from '../../helpers/http-helper'
import { Controller, EmailValidator, Authentication, HttpResponse, HttpRequest } from './login-protocols'

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

      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      var isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))

      const acessToken = await this.authentication.auth(email, password)
      if (!acessToken) {
        return unhauthorized()
      }

      return ok({ acessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
