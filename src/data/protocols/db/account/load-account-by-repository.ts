import { AccountModel } from '../../../usecases/authentication/db-authentication-protocols'

export interface LoadAccountByEmailRepository {
  loadByEmail (email: string): Promise<AccountModel | null>
}
