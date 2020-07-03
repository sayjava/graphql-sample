import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
};

export interface ServerConfig {
  port: number;
}

export const create = (config: ServerConfig) => {
  let socket;
  const app = express();
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  );

  return {
    start: () => {
      console.log(
        `Running a GraphQL API server at http://localhost:${config.port}/graphql`
      );
      socket = app.listen(config.port);
    },
    stop: () => {
      socket && socket.close();
    },
  };
};
