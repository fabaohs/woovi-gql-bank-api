import { connect, connection } from "mongoose";
import createDefaultAccounts from "./seeds/accountSeed";

async function startDb() {
  // WITHOUT .ENV, FOR NOW...
  const connectionString = "mongodb://bank_db:27017/PixVulture"; //String(process.env.DB_URL);

  await connect(connectionString);

  connection.once("open", () => {
    console.log("Connected to MongoDb");
  });

  connection.on("error", (e) => console.error("An error ocurred: \n", e));
  await createDefaultAccounts();
}

export default startDb;
