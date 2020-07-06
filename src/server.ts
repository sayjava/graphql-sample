import express from "express";
import graphqlHTTP from "express-graphql";
import { GraphQLSchema } from "graphql";

export interface ServerConfig {
  port: number;
  schema: GraphQLSchema;
}

export const create = (config: ServerConfig) => {
  let socket;
  const app = express();
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: config.schema,
      graphiql: true,
      customFormatErrorFn: (err) => {
        console.error(err.stack);
        return err.stack;
      },
    })
  );

  return {
    start: () => (socket = app.listen(config.port)),
    stop: () => socket && socket.close(),
  };
};
