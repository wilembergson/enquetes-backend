import { Collection, MongoClient } from "mongodb"

//const client = new MongoClient(process.env.MONGO_URL)
export class MongoHelper {
  private client: MongoClient

  constructor() {
    this.client = new MongoClient(process.env.MONGO_URL)
  }

  async connect(uri: string): Promise<void> {
    await this.client.connect()
  }

  async disconnect(): Promise<void> {
    await this.client.close()
  }

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  }

  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toJSON() })
  }
}
/*export class MongoHelper {
  private db: any
  private mongoClient: MongoClient

  constructor() {
    this.mongoClient = new MongoClient(process.env.MONGO_URL)
  }

  async connect(): Promise<void> {
    try {
      await this.mongoClient.connect()
      this.db = this.mongoClient.db(process.env.DATABASE)
    } catch (error) {
      console.log(error)

    }
  }

  async disconnect(): Promise<void> {
    await this.db.close()
  }

  getCollection(name: string): Collection {
    return this.db.collection(name)
  }
}*/