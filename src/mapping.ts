import { BigInt, BigDecimal, Address, log } from "@graphprotocol/graph-ts";
import {
  BuildCall,
  Index,
  LogAccountCreated,
  LogNewAccount,
  LogNewCheck,
  LogNewMaster,
  LogUpdateMaster,
} from "../generated/Index/Index";
import {
  LogEnableUser,
  LogDisableUser,
  Default_Implementation,
} from "../generated/Default_Implementation/Default_Implementation";

import {
  Implementation_M1,
  LogCast as Cast,
} from "../generated/Implementation_M1/Implementation_M1";

import {
  Connectors_V2,
  LogController,
  LogConnectorAdded,
  LogConnectorRemoved,
  LogConnectorUpdated,
  ToggleChiefCall,
} from "../generated/Connectors_V2/Connectors_V2";

import {
  Implementations,
  LogAddImplementation,
  LogRemoveImplementation,
  LogSetDefaultImplementation,
} from "../generated/Implementations/Implementations";

import {
  AccountCreated,
  NewAccount,
  NewCheck,
  NewMaster,
  UpdateMaster,
  DisableUser,
  EnableUser,
  LogCast,
  Controller,
  ConnectorRemoved,
  ConnectorAdded,
  ConnectorUpdated,
  AddImplementation,
  RemoveImplementation,
  SetDefaultImplementation,
} from "../generated/schema";

export function handleLogCast(event: Cast): void {
  let logCast = LogCast.load(
    event.params.sender
      .toHexString()
      .concat("-")
      .concat("LOGCAST")
  );

  if (logCast == null) {
    logCast = new LogCast(
      event.params.sender
        .toHexString()
        .concat("-")
        .concat("LOGCAST")
    );
  }

  logCast.dsaWallet = event.params.sender;
  logCast.origin = event.params.origin;
  logCast.eventNames = event.params.eventNames;
  logCast.eventParams = event.params.eventParams;
  logCast.txHash = event.transaction.hash;
  logCast.timestamp = event.block.timestamp;
  logCast.blockNumber = event.block.number;

  logCast.save();
}

export function handleLogAccountCreated(event: LogAccountCreated): void {
  let accountCreated = AccountCreated.load(
    event.params.account.toHexString() + "-" + "ACCOUNTCREATED"
  );
  let contract = Index.bind(event.address);

  if (accountCreated == null) {
    accountCreated = new AccountCreated(
      event.params.account.toHexString() + "-" + "ACCOUNTCREATED"
    );
  }

  accountCreated.account = event.params.account;
  accountCreated.origin = event.params.origin;
  accountCreated.version = contract.versionCount();
  accountCreated.owner = event.params.owner;
  accountCreated.sender = event.params.sender;
  accountCreated.txHash = event.transaction.hash;
  accountCreated.timestamp = event.block.timestamp;
  accountCreated.blockNumber = event.block.number;

  accountCreated.save();
}

export function handleLogNewAccount(event: LogNewAccount): void {
  let newAccount = NewAccount.load(
    event.params._newAccount.toHexString() + "-" + "NEWACCOUNT"
  );

  if (newAccount == null) {
    newAccount = new NewAccount(
      event.params._newAccount.toHexString() + "-" + "NEWACCOUNT"
    );
  }

  newAccount.newAccount = event.params._newAccount;
  newAccount.connectors = event.params._connectors;
  newAccount.check = event.params._check;
  newAccount.txHash = event.transaction.hash;
  newAccount.timestamp = event.block.timestamp;
  newAccount.blockNumber = event.block.number;

  newAccount.save();
}

export function handleLogNewCheck(event: LogNewCheck): void {
  let newCheck = NewCheck.load(
    event.params.check.toHexString() + "-" + "NEWCHECK"
  );

  if (newCheck == null) {
    newCheck = new NewCheck(
      event.params.check.toHexString() + "-" + "NEWCHECK"
    );
  }

  newCheck.check = event.params.check;
  newCheck.accountVersion = event.params.accountVersion;
  newCheck.txHash = event.transaction.hash;
  newCheck.timestamp = event.block.timestamp;
  newCheck.blockNumber = event.block.number;

  newCheck.save();
}

export function handleLogNewMaster(event: LogNewMaster): void {
  let newMaster = NewMaster.load(
    event.params.master.toHexString() + "-" + "NEWMASTER"
  );

  if (newMaster == null) {
    newMaster = new NewMaster(
      event.params.master.toHexString() + "-" + "NEWMASTER"
    );
  }

  newMaster.newMasterAccount = event.params.master;
  newMaster.txHash = event.transaction.hash;
  newMaster.timestamp = event.block.timestamp;
  newMaster.blockNumber = event.block.number;

  newMaster.save();
}

export function handleLogUpdateMaster(event: LogUpdateMaster): void {
  let updateMaster = UpdateMaster.load(
    event.params.master.toHexString() + "-" + "UPDATEMASTER"
  );

  if (updateMaster == null) {
    updateMaster = new UpdateMaster(
      event.params.master.toHexString() + "-" + "UPDATEMASTER"
    );
  }

  updateMaster.updatedAccount = event.params.master;
  updateMaster.txHash = event.transaction.hash;
  updateMaster.timestamp = event.block.timestamp;
  updateMaster.blockNumber = event.block.number;

  updateMaster.save();
}

export function handleLogEnableUser(event: LogEnableUser): void {
  let enableUser = EnableUser.load(
    event.params.user.toHexString() + "-" + "ENABLEUSER"
  );
  /** 
  let contract = Default_Implementation.bind(event.address);
  let defaultImplementation = DefaultImplementation.load(
    event.address.toHexString()
  );
**/
  if (enableUser == null) {
    enableUser = new EnableUser(
      event.params.user.toHexString() + "-" + "ENABLEUSER"
    );
  }

  enableUser.user = event.params.user;
  enableUser.txHash = event.transaction.hash;
  enableUser.timestamp = event.block.timestamp;
  enableUser.blockNumber = event.block.number;
  /**
  let implementationVersionCall = contract.try_implementationVersion();
  let versionCall = contract.try_version();

  if (!implementationVersionCall.reverted) {
    defaultImplementation.implementationVersion =
      implementationVersionCall.value;
  } else {
    log.warning("ImplementationVersionCall Reverted", []);
  }

  if (!versionCall.reverted) {
    defaultImplementation.version = versionCall.value;
  } else {
    log.warning("VersionCall Reverted", []);
  }
  defaultImplementation.address = contract._address;
  defaultImplementation.name = contract._name;

  defaultImplementation.save();
  **/
  enableUser.save();
}

export function handleLogDisableUser(event: LogDisableUser): void {
  let disableUser = DisableUser.load(
    event.params.user.toHexString() + "-" + "DISABLEUSER"
  );

  if (disableUser == null) {
    disableUser = new DisableUser(
      event.params.user.toHexString() + "-" + "DISABLEUSER"
    );
  }

  disableUser.user = event.params.user;
  disableUser.txHash = event.transaction.hash;
  disableUser.timestamp = event.block.timestamp;
  disableUser.blockNumber = event.block.number;

  disableUser.save();
}

// export function handleBuildCall(call: BuildCall): void {
//   let buildCall = new Build(call.block.number.toHexString());

//   buildCall.address = call.inputs._owner;
//   buildCall.accountVersion = call.inputs.accountVersion;
//   buildCall.origin = call.inputs._origin;

//   buildCall.save();
// }

export function handleLogConnectorAdded(event: LogConnectorAdded): void {
  let connectorAdded = ConnectorAdded.load(
    event.params.connector.toHexString() + "-" + "CONNECTORADDED"
  );
  if (connectorAdded == null) {
    connectorAdded = new ConnectorAdded(
      event.params.connector.toHexString() + "-" + "CONNECTORADDED"
    );
  }

  connectorAdded.connector = event.params.connector;
  connectorAdded.connectorName = event.params.connectorName;
  connectorAdded.connectorNameHash = event.params.connectorNameHash;
  connectorAdded.txHash = event.transaction.hash;
  connectorAdded.timestamp = event.block.timestamp;
  connectorAdded.blockNumber = event.block.number;

  connectorAdded.save();
}

export function handleLogController(event: LogController): void {
  let controller = Controller.load(
    event.params.addr
      .toHexString()
      .concat("-")
      .concat("CONTROLLER")
  );

  if (controller == null) {
    controller = new Controller(
      event.params.addr
        .toHexString()
        .concat("-")
        .concat("CONTROLLER")
    );
  }

  controller.address = event.params.addr;
  controller.enabled = event.params.isChief;
  controller.txHash = event.transaction.hash;
  controller.timestamp = event.block.timestamp;
  controller.blockNumber = event.block.number;

  controller.save();
}

export function handleLogConnectorRemoved(event: LogConnectorRemoved): void {
  let connectorRemoved = ConnectorRemoved.load(
    event.params.connector.toHexString() + "-" + "CONNECTORREMOVED"
  );
  if (connectorRemoved == null) {
    connectorRemoved = new ConnectorRemoved(
      event.params.connector.toHexString() + "-" + "CONNECTORREMOVED"
    );
  }

  connectorRemoved.connector = event.params.connector;
  connectorRemoved.connectorName = event.params.connectorName;
  connectorRemoved.connectorNameHash = event.params.connectorNameHash;
  connectorRemoved.txHash = event.transaction.hash;
  connectorRemoved.timestamp = event.block.timestamp;
  connectorRemoved.blockNumber = event.block.number;

  connectorRemoved.save();
}

export function handleLogConnectorUpdated(event: LogConnectorUpdated): void {
  let connectorUpdated = ConnectorUpdated.load(
    event.params.newConnector.toHexString() + "-" + "CONNECTORUPDATED"
  );
  if (connectorUpdated == null) {
    connectorUpdated = new ConnectorUpdated(
      event.params.newConnector.toHexString() + "-" + "CONNECTORUPDATED"
    );
  }

  connectorUpdated.newConnector = event.params.newConnector;
  connectorUpdated.oldConnector = event.params.oldConnector;
  connectorUpdated.connectorName = event.params.connectorName;
  connectorUpdated.connectorNameHash = event.params.connectorNameHash;
  connectorUpdated.txHash = event.transaction.hash;
  connectorUpdated.timestamp = event.block.timestamp;
  connectorUpdated.blockNumber = event.block.number;

  connectorUpdated.save();
}

// export function handleToggleChiefCall(call: ToggleChiefCall): void {
//   let toggleChief = new ToggleChief(call.block.number.toHexString());

//   toggleChief.chiefAddress = call.inputs._chiefAddress;
//   toggleChief.save();
// }

export function handleLogAddImplementation(event: LogAddImplementation): void {
  let addImplementation = AddImplementation.load(
    event.params.implementation
      .toHexString()
      .concat("-")
      .concat("ADDIMPLEMENTATION")
  );
  let contract = Implementations.bind(event.address);

  if (addImplementation == null) {
    addImplementation = new AddImplementation(
      event.params.implementation
        .toHexString()
        .concat("-")
        .concat("ADDIMPLEMENTATION")
    );
  }

  let defaultImplementationCall = contract.try_defaultImplementation();
  if (!defaultImplementationCall.reverted) {
    addImplementation.defaultImplementation = defaultImplementationCall.value;
  } else {
    log.warning("DefaultImplementationCall Reverted", []);
  }

  addImplementation.implementation = event.params.implementation;
  addImplementation.sigs = event.params.sigs;
  addImplementation.txHash = event.transaction.hash;
  addImplementation.timestamp = event.block.timestamp;
  addImplementation.blockNumber = event.block.number;

  addImplementation.save();
}

export function handleLogRemoveImplementation(
  event: LogRemoveImplementation
): void {
  let removeImplementation = RemoveImplementation.load(
    event.params.implementation.toHexString() + "-" + "REMOVEIMPLEMENTATION"
  );
  if (removeImplementation == null) {
    removeImplementation = new RemoveImplementation(
      event.params.implementation.toHexString() + "-" + "REMOVEIMPLEMENTATION"
    );
  }
  let contract = Implementations.bind(event.address);

  let defaultImplementationCall = contract.try_defaultImplementation();
  if (!defaultImplementationCall.reverted) {
    removeImplementation.defaultImplementation =
      defaultImplementationCall.value;
  } else {
    log.warning("DefaultImplementationCall Reverted", []);
  }

  removeImplementation.implementation = event.params.implementation;
  removeImplementation.sigs = event.params.sigs;
  removeImplementation.txHash = event.transaction.hash;
  removeImplementation.timestamp = event.block.timestamp;
  removeImplementation.blockNumber = event.block.number;

  removeImplementation.save();
}

export function handleLogSetDefaultImplementation(
  event: LogSetDefaultImplementation
): void {
  let setDefaultImplementation = SetDefaultImplementation.load(
    event.params.newImplementation.toHexString() +
      "-" +
      "SETDEFAULTIMPLEMENTATION"
  );
  if (setDefaultImplementation == null) {
    setDefaultImplementation = new SetDefaultImplementation(
      event.params.newImplementation.toHexString() +
        "-" +
        "SETDEFAULTIMPLEMENTATION"
    );
  }
  let contract = Implementations.bind(event.address);
  let defaultImplementationCall = contract.try_defaultImplementation();

  if (!defaultImplementationCall.reverted) {
    setDefaultImplementation.defaultImplementation =
      defaultImplementationCall.value;
  } else {
    log.warning("DefaultImplementationCall Reverted", []);
  }

  setDefaultImplementation.newImplementation = event.params.newImplementation;
  setDefaultImplementation.oldImplementation = event.params.oldImplementation;
  setDefaultImplementation.txHash = event.transaction.hash;
  setDefaultImplementation.timestamp = event.block.timestamp;
  setDefaultImplementation.blockNumber = event.block.number;

  setDefaultImplementation.save();
}
