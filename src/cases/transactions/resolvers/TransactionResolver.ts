import TransactionModel from "../models/TransactionModel";
import AccountModel from "../../accounts/models/AccountModel";
import { startSession } from "mongoose";
import { iCreateTransaction } from "../graphql/mutations/CreateTransaction";

export async function doTransaction(data: iCreateTransaction) {
  // CHECK IF ACCOUNTS EXISTS
  const session = await startSession();
  session.startTransaction();

  const sender = await AccountModel.findOne({
    accNumber: data.senderAccount,
  });

  const receiver = await AccountModel.findOne({
    accNumber: data.receiverAccount,
  });

  if (!sender || !receiver) {
    session.abortTransaction();
    session.endSession();
    throw new Error("Sender or receiver not found");
  }

  if (sender.balance < data.ammount) {
    session.abortTransaction();
    session.endSession();
    throw new Error("Insufficient balance");
  }

  sender.balance -= data.ammount;
  receiver.balance += data.ammount;

  // REFACT THIS TO USE PROMISE.ALL

  receiver.save();
  sender.save();

  const created = await TransactionModel.create({
    ...data,
  })
    .then((res) => res)
    .catch((err) => {
      console.log("An error ocurred: \n", err);
      session.abortTransaction();
      throw new Error("Internal Server Error");
    })
    .finally(() => session.endSession());

  return created;
}
