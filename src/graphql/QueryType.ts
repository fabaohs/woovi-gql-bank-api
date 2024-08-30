import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";
import { AccountConnection } from "../cases/accounts/graphql/AccountType";
import AccountService from "../cases/accounts/resolvers/AccountResolver";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: 'Just the "get endpoint"',
  fields: () => ({
    accounts: {
      type: new GraphQLNonNull(AccountConnection),
      args: connectionArgs,
      resolve: async (_, args, context) => {
        const data = await AccountService.GetAccounts();
        return connectionFromArray(data, args);
      },
    },
  }),
});

export default QueryType;
