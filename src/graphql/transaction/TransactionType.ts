import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions } from "graphql-relay";
import { iTransaction } from "../../database/models/TransactionModel";

const TransactionType = new GraphQLObjectType<iTransaction>({
  name: "Transaction",
  fields: () => ({
    receiverId: {
      type: GraphQLString,
      resolve: (transaction) => transaction.receiverId,
    },
    senderId: {
      type: GraphQLString,
      require: true,
    },
    ammount: {
      type: GraphQLInt,
      required: true,
    },
    created_at: {
      type: GraphQLString,
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
