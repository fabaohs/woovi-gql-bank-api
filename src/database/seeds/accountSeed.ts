import AccountModel from "../models/AccountModel";

async function createDefaultAccounts() {
  const checkIfAlreadyHasAccounts = await AccountModel.find().catch((err) => {
    throw new Error(err.message);
  });

  console.log(
    "Checking if default accounts already exist...",
    checkIfAlreadyHasAccounts
  );

  if (!checkIfAlreadyHasAccounts || checkIfAlreadyHasAccounts.length > 0) {
    console.log("Default accounts already created! Skipping...");
    return;
  }

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

  console.log("Creating default accounts...");

  await AccountModel.insertMany(accountSeed).catch((err) => {
    throw new Error(err.message);
  });

  console.log("Default accounts created!");
}

export default createDefaultAccounts;
