import { AddAccountModel } from '../../domain/use-cases/add-account'
import { AccountModel } from '../../domain/model/account'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}