import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions } from "graphql-relay";
import { iTransaction } from "../models/TransactionModel";

const TransactionType = new GraphQLObjectType<iTransaction>({
  name: "Transaction",
  fields: () => ({
    receiverAccount: {
      type: GraphQLString,
      require: true,
      resolve: (transaction) => transaction.receiverAccount,
    },
    senderAccount: {
      type: GraphQLString,
      require: true,
      resolve: (transaction) => transaction.senderAccount,
    },
    ammount: {
      type: GraphQLInt,
      required: true,
      resolve: (transaction) => transaction.ammount,
    },
    created_at: {
      type: GraphQLString,
      resolve: (transaction) => transaction.created_at,
    },
  }),
});

const { connectionType: TransactionConnection, edgeType: TransactionEdge } =
  connectionDefinitions({
    nodeType: TransactionType,
    connectionFields: {
      totalCount: {
        type: GraphQLInt,
        resolve: (connection) => connection.edges.length,
      },
    },
  });

export { TransactionConnection, TransactionEdge };

export default TransactionType;
