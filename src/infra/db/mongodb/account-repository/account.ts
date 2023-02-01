import { AddAccountRepository } from "../../../../data/protocols/db/add-account-repository";
import { AccountModel } from "../../../../domain/model/account";
import { AddAccountModel } from "../../../../domain/use-cases/add-account";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: result.insertedId })
    //await MongoHelper.disconnect()
    return MongoHelper.map(account)
  }
}