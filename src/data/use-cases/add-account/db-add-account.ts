import { AccountModel } from "../../../domain/model/account";
import { AddAccount, AddAccountModel } from "../../../domain/use-cases/add-account";
import { Encrypter } from "../../pretocols/encrypter";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }

}