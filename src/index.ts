import Koa from "koa";
import mount from "koa-mount";
import { config } from "dotenv";

import { graphqlHTTP } from "koa-graphql";

import { schema } from "./graphql/";
import startDb from "./database/db";

config();

startDb();

const app = new Koa();
const port = 4000;

app.use(mount("/graphql", graphqlHTTP({ schema, graphiql: true })));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
