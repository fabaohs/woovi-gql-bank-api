import { GraphQLObjectType } from "graphql";
import AccountMutations from "./account/mutations";
import TransactionMutations from "./transaction/mutations";

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...AccountMutations,
    ...TransactionMutations,
  }),
});

export default MutationType;
