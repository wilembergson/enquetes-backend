import { MongoClient } from "mongodb"
import dotenv from 'dotenv'
import env from "../../../main/config/env"

dotenv.config()

let connection = null
try {
  connection = new MongoClient(env.mongoUrl)
} catch (error) {
  console.log(error)
}

export default connection