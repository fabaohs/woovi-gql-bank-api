import { Schema, model } from "mongoose";

export interface iTransaction {
  _id: string;
  receiverAccount: string;
  senderAccount: string;
  ammount: number;
  created_at: Date;
}

const transactionSchema = new Schema<iTransaction>({
  receiverAccount: {
    type: String,
    require: true,
  },
  senderAccount: {
    type: String,
    require: true,
  },
  ammount: {
    type: Number,
    require: true,
  },
  created_at: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

const TransactionModel = model<iTransaction>("Transactions", transactionSchema);
export default TransactionModel;
