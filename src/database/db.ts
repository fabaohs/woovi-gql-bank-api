import { connect, connection } from "mongoose";

async function startDb() {
  // WITHOUT .ENV, FOR NOW...
  const connectionString = "mongodb://localhost:27017/PixVulture";

  await connect(connectionString);

  connection.once("open", () => {
    console.log("Connected to MongoDb");
  });

  connection.on("error", (e) => console.error("An error ocurred: \n", e));
}

export default startDb;
