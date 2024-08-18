import { Schema, model } from "mongoose";

export interface iTransaction {
  _id: string;
  receiverId: string;
  senderId: string;
  ammount: number;
  created_at: Date;
}

const transactionSchema = new Schema<iTransaction>({
  receiverId: {
    type: String,
    require: true,
  },
  senderId: {
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
