import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { globalIdField } from "graphql-relay";
import { iAccount } from "../models/AccountModel";
import { connectionDefinitions } from "graphql-relay";

const AccountType = new GraphQLObjectType<iAccount>({
  name: "Account",
  description: "Account type def",
  fields: () => ({
    id: globalIdField("Account"),
    accountNumber: {
      type: GraphQLString,
      resolve: (account) => account.accNumber,
    },
    cpf: {
      type: GraphQLString,
      resolve: (account) => account.cpf,
    },
    password: {
      type: GraphQLString,
      resolve: () => null,
    },
    userName: {
      type: GraphQLString,
      resolve: (account) => account.userName,
    },
    balance: {
      type: GraphQLFloat,
      resolve: (account) => account.balance,
    },
  }),
});

const { connectionType: AccountConnection, edgeType: AccountEdge } =
  connectionDefinitions({
    nodeType: AccountType,
    connectionFields: {
      totalCount: {
        type: GraphQLInt,
        resolve: (connection) => connection.edges.length,
      },
    },
  });

export { AccountConnection, AccountEdge };

export default AccountType;
