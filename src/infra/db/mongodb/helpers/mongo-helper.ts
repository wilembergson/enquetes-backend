import { Collection } from "mongodb"
import connection from "../mongo-connection"

export const MongoHelper = {
  connection,
  async connect(): Promise<void> {
    await connection.connect()
  },

  async disconnect(): Promise<void> {
    await this.connection.close()
  },

  getCollection(name: string): Collection {
    return this.connection.db().collection(name)
  },

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