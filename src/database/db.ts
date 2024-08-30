import { connect, connection } from "mongoose";
import createDefaultAccounts from "./seeds/accountSeed";

const connectionString = "mongodb://localhost:27017/PixVulture"; // "mongodb://bank_db:27017/PixVulture";
async function startDb() {
  await connect(connectionString);

  connection.once("open", () => {
    console.log("Connected to MongoDb");
  });

  connection.on("error", (e) => console.error("An error ocurred: \n", e));
  await createDefaultAccounts();
}

export default startDb;
