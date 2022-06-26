import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-repository'
import { UpdateAccessTokenRepository } from '../../protocols/db/account/update-acess-token-repository'
import { Encrypter } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository, private readonly hashComparer: HashComparer, private readonly encrypter: Encrypter, private readonly updateAcessTokenRepository: UpdateAccessTokenRepository) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (!account) return null
    const isValid = await this.hashComparer.compare(authentication.password, account.password)
    if (isValid) {
      const accessToken = await this.encrypter.encrypt(account.id)
      await this.updateAcessTokenRepository.updateAccessToken(account.id, accessToken)
      return accessToken
    }
    return null
  }
}
