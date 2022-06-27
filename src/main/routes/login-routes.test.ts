import { hash } from 'bcrypt'
import request from 'supertest'
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

let accountCollection
describe('Login routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'Weverton',
        email: 'wevertoncouto@coutodev.com.br',
        password: password
      })
      await request(app)
        .post('/api/login')
        .send({
          password: 'any_password',
          email: 'wevertoncouto@coutodev.com.br'
        })
        .expect(200)
    })
  })
})
