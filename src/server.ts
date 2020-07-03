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
    })
  );

  return {
    start: () => {
      console.log(
        `Running the prototype GraphQL API server at http://localhost:${config.port}/graphql`
      );
      socket = app.listen(config.port);
    },
    stop: () => {
      socket && socket.close();
    },
  };
};
