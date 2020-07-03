#!/usr/bin/env node
import commander from "commander";
import { create } from "./server";
import loadConfig from "./config";
const pkg = require("../package.json");

const program = new commander.Command()
  .name("skimah")
  .description("Skimah CLI")
  .version(pkg.version, "-v, --vers", "output the current version")
  .usage("[options] path/to/schema.graphql")
  .option(
    "-s, --schema <string>",
    "Schema file",
    "./examples/simple/schema.graphql"
  )
  .option("-p, --port <number>", "Server Port", "8080")
  .parse();

const config = loadConfig(program);

// const server = create({ port: parseInt(program.port) });
// server.start();

// process.on("SIGINT", () => {
//   console.log("Stopping server!");
//   server && server.stop();
//   process.exit(0);
// });
