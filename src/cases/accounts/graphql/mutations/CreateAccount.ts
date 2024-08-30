import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import AccountModel, { iAccount } from "../../models/AccountModel";
import { AccountEdge } from "../AccountType";
import AccountResolver from "../../resolvers/AccountResolver";

export interface iResponse<T> {
  data?: T;
  message: string;
  success: boolean;
}

export default mutationWithClientMutationId({
  name: "CreateAccount",
  inputFields: {
    userName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    cpf: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ userName, password, cpf }) => {
    try {
      const account = await AccountResolver.CreateAccount({
        userName,
        password,
        cpf,
      });
      return {
        data: account,
        message: "Account created successfully",
        success: true,
      } as iResponse<iAccount>;
    } catch (err) {
      return {
        data: null,
        message: "Internal Server Error",
        success: false,
      } as iResponse<null>;
    }
  },
  outputFields: {
    data: {
      type: AccountEdge,
      resolve: async ({ data }) => {
        if (!data || !data._id) {
          return null;
        }

        return {
          node: data,
          cursor: toGlobalId("Account", data._id),
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
