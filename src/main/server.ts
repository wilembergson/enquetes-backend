import { MongoHelper } from "../infra/db/mongodb/helpers/mongo-helper"
import dotenv from 'dotenv'
import env from "./config/env"

dotenv.config()

MongoHelper.connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Running on port ${env.port}...`))
  })
  .catch(console.error)
