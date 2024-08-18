import AccountModel from "../database/models/AccountModel";

interface iCreateAccount {
  userName: string;
  password: string;
  cpf: string;
}

export default class AccountResolver {
  constructor() {}

  static async CreateAccount(data: iCreateAccount) {
    let randomAccNumber = Math.floor(Math.random() * 1000);

    // CHECK IF ACC NUMBER EXISTS
    const accNumberExists = await AccountModel.findOne({
      accNumber: randomAccNumber,
    });

    while (accNumberExists) {
      randomAccNumber = Math.floor(Math.random() * 1000);
    }

    const created = await AccountModel.create({
      ...data,
      accNumber: randomAccNumber,
    })
      .then((res) => res)
      .catch((err) => {
        console.log("An error ocurred: \n", err);
        throw new Error("Internal server error");
      });

    return created;
  }

  // CHANGE THIS TO LOGIN LATER
  static async GetAccounts() {
    const accounts = await AccountModel.find()
      .then((res) => res)
      .catch((err) => {
        console.log("An error ocurred: \n", err);
        return [];
      });

    return accounts;
  }
}
