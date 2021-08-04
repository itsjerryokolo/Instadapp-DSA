import { BigInt } from "@graphprotocol/graph-ts"
import {
  InstadappDSA,
  LogAccountCreated,
  LogNewAccount,
  LogNewCheck,
  LogNewMaster,
  LogUpdateMaster
} from "../generated/InstadappDSA/InstadappDSA"
import {
   Account,
   AccountCreated,
   NewAccount,
   NewCheck,
   NewMaster,
   UpdateMaster
   } from "../generated/schema"

export function handleLogAccountCreated(event: LogAccountCreated): void {
  let accountCreated =  AccountCreated.load(event.params.account.toHexString() + "-" + "ACCOUNTCREATED")
  let account = Account.load(event.params.owner.toHexString())

  if(account == null){
    account = new Account(event.params.owner.toHexString() )
  }

  if(accountCreated == null){
    accountCreated = new AccountCreated(event.params.account.toHexString() + "-" + "ACCOUNTCREATED")
  }

  accountCreated.account = event.params.account.toHexString()
  accountCreated.origin = event.params.origin.toHexString()
  accountCreated.owner = event.params.owner.toHexString()
  accountCreated.sender = event.params.sender.toHexString()
  accountCreated.txHash = event.transaction.hash
  accountCreated.timestamp = event.block.timestamp
  accountCreated.BlockNumber = event.block.number


  accountCreated.save()
  account.save()
}

export function handleLogNewAccount(event: LogNewAccount): void {
  let newAccount =  NewAccount.load(event.params._newAccount.toHexString() + "-" + "NEWACCOUNT")
  let account = Account.load(event.params._newAccount.toHexString())

  if(account == null){
    account = new Account(event.params._newAccount.toHexString())
  }

  if(newAccount == null){
    newAccount = new NewAccount(event.params._newAccount.toHexString() + "-" + "NEWACCOUNT")
  }

  newAccount.newAccount= event.params._newAccount.toHexString()
  newAccount.connectors = event.params._connectors.toHexString()
  newAccount.check = event.params._check.toHexString()
  newAccount.txHash = event.transaction.hash
  newAccount.timestamp = event.block.timestamp
  newAccount.BlockNumber = event.block.number


  newAccount.save()
  account.save()

}

export function handleLogNewCheck(event: LogNewCheck): void {
  let newCheck =  NewCheck.load(event.params.check.toHexString() + "-" + "NEWCHECK")
  let account = Account.load(event.params.check.toHexString())

  if(account == null){
    account = new Account(event.params.check.toHexString())
  }

  if(newCheck == null){
    newCheck = new NewCheck(event.params.check.toHexString() + "-" + "NEWCHECK")
  }

  newCheck.check = event.params.check.toHexString()
  newCheck.accountVersion = event.params.accountVersion
  newCheck.txHash = event.transaction.hash
  newCheck.timestamp = event.block.timestamp
  newCheck.BlockNumber = event.block.number


  newCheck.save()
  account.save()


}

export function handleLogNewMaster(event: LogNewMaster): void {
  let newMaster =  NewMaster.load(event.params.master.toHexString() + "-" + "NEWMASTER")
  let account = Account.load(event.params.master.toHexString())

  if(account == null){
    account = new Account(event.params.master.toHexString())
  }

  if(newMaster == null){
    newMaster = new NewMaster(event.params.master.toHexString() + "-" + "NEWMASTER")
  }

  newMaster.newMasterAccount = event.params.master.toHexString()
  newMaster.txHash = event.transaction.hash
  newMaster.timestamp = event.block.timestamp
  newMaster.BlockNumber = event.block.number


  newMaster.save()
  account.save()
}

export function handleLogUpdateMaster(event: LogUpdateMaster): void {
  let updateMaster =  UpdateMaster.load(event.params.master.toString() + "-" + "UPDATEMASTER")
  let account = Account.load(event.params.master.toHexString())

  if(account == null){
    account = new Account(event.params.master.toHexString())
  }

  if(updateMaster == null){
    updateMaster = new UpdateMaster(event.params.master.toString() + "-" + "UPDATEMASTER")
  }

  updateMaster.updatedAccount = event.params.master.toHexString()
  updateMaster.txHash = event.transaction.hash
  updateMaster.timestamp = event.block.timestamp
  updateMaster.BlockNumber = event.block.number


  updateMaster.save()
  account.save()
}
