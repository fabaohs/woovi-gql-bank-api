import AccountModel from "../models/AccountModel";

const accountSeed = [
  new AccountModel({
    accNumber: "123",
    balance: 1000,
    cpf: "11111111111",
    password: "123",
    userName: "John",
  }),
  new AccountModel({
    accNumber: "321",
    balance: 1000,
    cpf: "22222222222",
    password: "321",
    userName: "Doe",
  }),
];

async function createDefaultAccounts() {
  console.log("Creating default accounts...");
  const checkIfAlreadyHasAccounts = await AccountModel.find().catch((err) => {
    throw new Error(err.message);
  });

  if (checkIfAlreadyHasAccounts.length > 0) {
    console.log("Default accounts already created! Skipping...");
    return;
  }

  await AccountModel.insertMany(accountSeed).catch((err) => {
    throw new Error(err.message);
  });

  console.log("Default accounts created!");
}

export default createDefaultAccounts;
