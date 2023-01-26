import { Collection } from "mongodb"
import connection from "../mongo-connection"

export const MongoHelper = {
  connection,
  async connect(): Promise<void> {
    await connection.connect()
  },

  async disconnect(): Promise<void> {
    await this.connection.close()
    this.connection = null
  },

  async getCollection(name: string): Promise<Collection> {
    return this.connection.db().collection(name)
  },

  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toJSON() })
  }
}