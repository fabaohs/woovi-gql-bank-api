import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { AccountEdge } from "../../accounts/graphql/AccountType";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import AuthResolver from "../../../resolvers/AuthResolver";
import { iResponse } from "../../accounts/graphql/mutations/CreateAccount";
import { iAccount } from "../../accounts/models/AccountModel";

export interface iAuthenticate {
  cpf: string;
  password: string;
}

export default mutationWithClientMutationId({
  name: "AuthenticateUser",
  description: "Login",
  inputFields: {
    cpf: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ cpf, password }: iAuthenticate) => {
    try {
      const data = await AuthResolver.Authenticate({ cpf, password });

      return {
        message: "Logged in",
        success: true,
        data: data,
      } as iResponse<iAccount>;
    } catch (e) {
      return {
        data: null,
        message: e,
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
      resolve: async ({ message }) => message,
    },
  },
});
