import { MongoClient } from "mongodb"

let connection = null
try {
  connection = new MongoClient('mongodb://localhost:27017/clear_node')
} catch (error) {
  console.log(error)
}

export default connection