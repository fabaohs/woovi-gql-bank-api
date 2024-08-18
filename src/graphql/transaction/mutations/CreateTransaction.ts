import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import TransactionResolver from "../../../resolvers/TransactionResolver";
import { iResponse } from "../../account/mutations/CreateAccount";
import { iTransaction } from "../../../database/models/TransactionModel";
import { TransactionEdge } from "../TransactionType";
import { GraphQLBoolean, GraphQLFloat, GraphQLString } from "graphql";
import { iAccount } from "../../../database/models/AccountModel";

export default mutationWithClientMutationId({
  name: "CreateTransaction",
  inputFields: {
    receiver: {
      type: GraphQLString,
      description: "Receiver account number",
    },
    sender: {
      type: GraphQLString,
      description: "Sender account number",
    },
    ammount: {
      type: GraphQLFloat,
    },
  },
  mutateAndGetPayload: async ({ receiver, sender, ammount }) => {
    try {
      const transaction = await TransactionResolver.DoTransaction({
        receiver,
        sender,
        ammount,
      });

      return {
        data: transaction,
        message: "Transaction completed successfully",
        success: true,
      } as iResponse<iTransaction>;
    } catch (e) {
      return {
        message: e,
        success: false,
      } as iResponse<null>;
    }
  },
  outputFields: {
    data: {
      type: TransactionEdge,
      resolve: ({ data }) => {
        if (!data) {
          return null;
        }

        return {
          node: data,
          cursor: toGlobalId("Transaction", data._id),
        };
      },
    },
    message: {
      type: GraphQLString,
      resolve: ({ message }) => message,
    },
    success: {
      type: GraphQLBoolean,
      resolve: ({ success }) => success,
    },
  },
});
