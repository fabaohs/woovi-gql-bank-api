import { GraphQLObjectType } from "graphql";
import AccountMutations from "../cases/accounts/graphql/mutations";
import TransactionMutations from "../cases/transactions/graphql/mutations";

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...AccountMutations,
    ...TransactionMutations,
  }),
});

export default MutationType;
