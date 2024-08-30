import { describe, it, expect } from "vitest";

import { iCreateTransaction } from "../src/cases/transactions/graphql/mutations/CreateTransaction";
import { doTransaction } from "../src/cases/transactions/resolvers/TransactionResolver";

// ?TODO: STUDY VITEST AND ADD TESTS
describe("Test transaction creations", () => {
  it("Check race conditions", async () => {
    const transactionOne: iCreateTransaction = {
      receiverAccount: "123",
      senderAccount: "321",
      ammount: 1000,
    };

    const transactionTwo: iCreateTransaction = {
      receiverAccount: "123",
      senderAccount: "321",
      ammount: 1000,
    };

    // ?TODO: USE PROMISE.ALL
    const promises = [
      doTransaction(transactionOne),
      doTransaction(transactionTwo),
    ];
    // const isGreaterThanBalanceOne = await TransactionResolver.DoTransaction(
    //   transactionOne
    // );

    // const isGreaterThanBalanceTwo = await TransactionResolver.DoTransaction(
    //   transactionTwo
    // );

    Promise.all(promises)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // ?TODO: FIX THIS

    // expect(isGreaterThanBalanceOne).toBe({
    //   ammount: 1000,
    //   receiverAccount: "123",
    //   senderAccount: "321",
    // } as iCreateTransaction);

    // expect(isGreaterThanBalanceTwo).toThrow("Insufficient balance");
  });
});
