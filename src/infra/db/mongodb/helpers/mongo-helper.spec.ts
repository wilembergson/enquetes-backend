import { MongoHelper as sut } from "./mongo-helper"

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect()
  })
  afterAll(async () => {
    await sut.disconnect()
  })

  it('should reconnect if mongo is down', async () => {
    const accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})