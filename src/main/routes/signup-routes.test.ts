import request from "supertest"
import app from '../config/app'
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper"

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    accountCollection.deleteMany({})
  })

  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'berg',
        email: 'berg@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})