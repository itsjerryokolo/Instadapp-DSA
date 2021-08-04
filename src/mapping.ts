import { BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts"
import {
  InstadappDSA,
  LogAccountCreated,
  LogNewAccount,
  LogNewCheck,
  LogNewMaster,
  LogUpdateMaster
} from "../generated/InstadappDSA/InstadappDSA"
import {
   AccountCreated,
   NewAccount,
   NewCheck,
   NewMaster,
   UpdateMaster
   } from "../generated/schema"

export function handleLogAccountCreated(event: LogAccountCreated): void {
  let accountCreated =  AccountCreated.load(event.params.account.toHexString() + "-" + "ACCOUNTCREATED")

  if(accountCreated == null){
    accountCreated = new AccountCreated(event.params.account.toHexString() + "-" + "ACCOUNTCREATED")
  }

  accountCreated.account = event.params.account
  accountCreated.origin = event.params.origin
  accountCreated.owner = event.params.owner
  accountCreated.sender = event.params.sender
  accountCreated.txHash = event.transaction.hash
  accountCreated.timestamp = event.block.timestamp
  accountCreated.blockNumber = event.block.number


  accountCreated.save()
}

export function handleLogNewAccount(event: LogNewAccount): void {
  let newAccount =  NewAccount.load(event.params._newAccount.toHexString() + "-" + "NEWACCOUNT")

  if(newAccount == null){
    newAccount = new NewAccount(event.params._newAccount.toHexString() + "-" + "NEWACCOUNT")
  }

  newAccount.newAccount= event.params._newAccount
  newAccount.connectors = event.params._connectors
  newAccount.check = event.params._check
  newAccount.txHash = event.transaction.hash
  newAccount.timestamp = event.block.timestamp
  newAccount.blockNumber = event.block.number


  newAccount.save()

}

export function handleLogNewCheck(event: LogNewCheck): void {
  let newCheck =  NewCheck.load(event.params.check.toHexString() + "-" + "NEWCHECK")

  if(newCheck == null){
    newCheck = new NewCheck(event.params.check.toHexString() + "-" + "NEWCHECK")
  }

  newCheck.check = event.params.check
  newCheck.accountVersion = event.params.accountVersion
  newCheck.txHash = event.transaction.hash
  newCheck.timestamp = event.block.timestamp
  newCheck.blockNumber = event.block.number


  newCheck.save()

}

export function handleLogNewMaster(event: LogNewMaster): void {
  let newMaster =  NewMaster.load(event.params.master.toHexString() + "-" + "NEWMASTER")

  if(newMaster == null){
    newMaster = new NewMaster(event.params.master.toHexString() + "-" + "NEWMASTER")
  }

  newMaster.newMasterAccount = event.params.master
  newMaster.txHash = event.transaction.hash
  newMaster.timestamp = event.block.timestamp
  newMaster.blockNumber = event.block.number


  newMaster.save()

}

export function handleLogUpdateMaster(event: LogUpdateMaster): void {
  let updateMaster =  UpdateMaster.load(event.params.master.toHexString() + "-" + "UPDATEMASTER")

  if(updateMaster == null){
    updateMaster = new UpdateMaster(event.params.master.toHexString() + "-" + "UPDATEMASTER")
  }

  updateMaster.updatedAccount = event.params.master
  updateMaster.txHash = event.transaction.hash
  updateMaster.timestamp = event.block.timestamp
  updateMaster.blockNumber = event.block.number


  updateMaster.save()
}
