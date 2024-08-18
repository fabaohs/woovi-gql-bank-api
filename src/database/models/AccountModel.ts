import { Schema, model } from "mongoose";

export interface iAccount {
  _id?: string;
  cpf: string;
  accNumber: string;
  userName: string;
  password: string;
  balance: number;
}

const accountSchema = new Schema<iAccount>({
  accNumber: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  cpf: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
    default: 0.0,
  },
});

const AccountModel = model<iAccount>("Accounts", accountSchema);
export default AccountModel;
