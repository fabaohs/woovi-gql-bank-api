import { iAccount } from "./../database/models/AccountModel";
import AccountModel from "../database/models/AccountModel";
import { iAuthenticate } from "../graphql/account/mutations/Authenticate";
import { iResolverResponse } from "../interfaces/iResolverResponse";

export default class AuthResolver {
  constructor() {}

  // PAREI NO LOGIN DO USUARIO
  static async Authenticate(data: iAuthenticate) {
    const account = await AccountModel.findOne(data)
      .then((res) => res)
      .catch((err) => {
        console.log("An error ocurred", err);
        throw new Error("Internal server error");
      });

    //?TODO: LOGIC TO GET TOKEN
    return account;
  }
}
