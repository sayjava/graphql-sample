#!/usr/bin/env node

import { existsSync } from "fs";
import commander from "commander";
import { create } from "./server";
import loadConfig from "./config";
import skimah from "./skimah";
const pkg = require("../package.json");

const program = new commander.Command()
  .name("skimah")
  .description("Skimah CLI: Rapid GraphQL API prototyping")
  .version(pkg.version, "-v, --vers", "output the current version")
  .option("-s, --schema", "Path to schema file", "schema.graphql")
  .option("-p, --port", "Server port", "8080")
  .parse();

if (!existsSync(program.schema)) {
  process.stdout.write(program.helpInformation());
  process.exit(0);
}

let server;

const start = async () => {
  if (server) {
    server.stop();
  }

  try {
    const config = loadConfig(program);
    const { schema } = await skimah(config);
    server = create({ port: parseInt(program.port), schema });
    server.start();
  } catch (error) {
    console.error(error);
  }
};

start();

process.on("SIGINT", () => {
  console.log("Stopping server!");
  server && server.stop();
  process.exit(0);
});
