import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/database/mongodb/account/account-mongo-repository'
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../config/env'

export const makeDbAuthentication = (): DbAuthentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const hasherAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, hasherAdapter, jwtAdapter, accountMongoRepository)
  return dbAuthentication
}
