import TransactionModel from "../database/models/TransactionModel";
import AccountModel from "../database/models/AccountModel";

interface iCreateTransaction {
  receiver: string;
  sender: string;
  ammount: number;
}

export default class TransactionResolver {
  constructor() {}

  static async DoTransaction(data: iCreateTransaction) {
    // CHECK IF ACCOUNTS EXISTS
    const sender = await AccountModel.findOne({ accNumber: data.sender });
    const receiver = await AccountModel.findOne({ accNumber: data.receiver });

    if (!sender || !receiver) {
      throw new Error("Sender or receiver not found");
    }

    if (sender.balance < data.ammount) {
      throw new Error("Insufficient balance");
    }

    sender.balance -= data.ammount;
    receiver.balance += data.ammount;

    receiver.save();
    sender.save();

    const created = await TransactionModel.create({
      ...data,
    })
      .then((res) => res)
      .catch((err) => {
        console.log("An error ocurred: \n", err);
        throw new Error("Internal Server Error");
      });

    return created;
  }
}
