import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import TransactionResolver from "../../../resolvers/TransactionResolver";
import { iResponse } from "../../account/mutations/CreateAccount";
import { iTransaction } from "../../../database/models/TransactionModel";
import { TransactionEdge } from "../TransactionType";
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

export interface iCreateTransaction {
  receiverAccount: string;
  senderAccount: string;
  ammount: number;
}

export default mutationWithClientMutationId({
  name: "CreateTransaction",
  inputFields: {
    receiverAccount: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Receiver account number",
    },
    senderAccount: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Sender account number",
    },
    ammount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
  mutateAndGetPayload: async ({
    receiverAccount,
    senderAccount,
    ammount,
  }: iCreateTransaction) => {
    try {
      const transaction = await TransactionResolver.DoTransaction({
        receiverAccount,
        senderAccount,
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
