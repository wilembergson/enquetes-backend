import { MongoHelper } from "../infra/db/mongodb/helpers/mongo-helper"
import env from "./config/env"

MongoHelper.connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Running on port ${env.port}...`))
  })
  .catch(console.error)
