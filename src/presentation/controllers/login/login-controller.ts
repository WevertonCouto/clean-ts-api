import { badRequest, ok, serverError, unhauthorized } from '../../helpers/http/http-helper'
import { Validation } from '../signup/signup-controller-protocols'
import { Controller, Authentication, HttpResponse, HttpRequest } from './login-controller-protocols'

export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body
      const acessToken = await this.authentication.auth({ email, password })
      if (!acessToken) {
        return unhauthorized()
      }

      return ok({ acessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
