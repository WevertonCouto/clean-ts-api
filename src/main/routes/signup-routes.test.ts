import request from 'supertest'
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

describe('Signup routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Weverton',
        email: 'wevertoncouto@coutodev.com.br',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
