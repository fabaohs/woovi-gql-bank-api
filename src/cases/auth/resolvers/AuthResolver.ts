import { iAccount } from "../cases/accounts/models/AccountModel";
import AccountModel from "../cases/accounts/models/AccountModel";
import { iAuthenticate } from "../cases/auth/graphql/Authenticate";

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

    //?TODO: LOGIC TO GET USE SOME TOKEN (jwt or anything else)
    return account;
  }
}
