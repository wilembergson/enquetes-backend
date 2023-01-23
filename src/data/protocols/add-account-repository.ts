import { AddAccountModel } from '../../domain/use-cases/add-account'
import { AccountModel } from '../../domain/model/account'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}