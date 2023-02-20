import request from "supertest"
import app from '../config/app'
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper"
import { Collection, ObjectId } from "mongodb"
import { sign } from "jsonwebtoken"
import env from "../config/env"

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /suveys', () => {
    it('should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'hhtp://image-name.com'
          },
          {
            answer: 'Answer 2'
          }]
        })
        .expect(403)
    })

    it('should return 204 on add survey with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: "Anyone",
        email: 'anyone@gmail.com',
        password: '123',
        role: 'admin'
      })
      const id = res.insertedId.toString()
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: new ObjectId(id)
      },{
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'hhtp://image-name.com'
          },
          {
            answer: 'Answer 2'
          }]
        })
        .expect(204)
    })
  })
})