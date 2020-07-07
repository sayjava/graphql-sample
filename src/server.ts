import express from "express";
import { ApolloServer } from "apollo-server-express";
import { GraphQLSchema } from "graphql";

export interface ServerConfig {
  port: number;
  schema: GraphQLSchema;
}

export const create = (config: ServerConfig) => {
  let socket;
  const app = express();
  const server = new ApolloServer({
    schema: config.schema,
    playground: true,
  });

  server.applyMiddleware({ app });

  return {
    start: () => (socket = app.listen(config.port)),
    stop: () => socket && socket.close(),
  };
};
