import request from "supertest"
import { hash } from "bcrypt"
import app from '../config/app'
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper"
import { Collection } from "mongodb"

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    accountCollection.deleteMany({})
  }) 

  describe('POST /signup', () => {
    it('should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    it('should return 200 on login', async () => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        name: 'berg',
        email: 'berg@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'berg@gmail.com',
          password: '123456',
        })
        .expect(200)
    })

    it('should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'berg@gmail.com',
          password: '123456',
        })
        .expect(401)
    })
  })
})