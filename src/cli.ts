#!/usr/bin/env node
import chalk from "chalk";
import commander from "commander";
import { existsSync, unwatchFile, watchFile } from "fs";
import loadConfig from "./config";
import { create } from "./server";
import skimah from "./skimah";
const pkg = require("../package.json");

const program = new commander.Command()
  .name("graphql-sample")
  .option("-s, --schema <schema>", "path to schema file", "schema.graphql")
  .option("-p, --port <number>", "server port")
  .description("Graphql Sample: Rapid GraphQL API prototyping")
  .version(pkg.version, "-v, --vers", "output the current version")
  .parse(process.argv);

if (!existsSync(program.schema)) {
  process.stdout.write(program.helpInformation());
  process.exit(0);
}

const port = parseInt(program.port, 10) || 8080;

let server;
const start = async () => {
  if (server) {
    console.log(chalk.blue("🔆  Detected Schema Change, Restarting ......"));
    server.stop();
  } else {
    console.log(chalk.green("🔆 Starting ......"));
  }

  try {
    const config = loadConfig(program);
    const { schema } = await skimah(config);
    server = create({
      port,
      schema,
    });
    console.log(
      `
        🚀 ${chalk.blue(
          `Running the prototype GraphQL API server at ${chalk.underline(
            `http://localhost:${port}/graphql`
          )}`
        )}

        🗼 ${chalk.blue(`Watching  ..... ${program.schema}`)}
      `
    );
    server.start();
  } catch (error) {
    console.log(error.stack);
    console.log(`🔴 ${chalk.redBright(error)}`);
  }
};

// Start watching file
watchFile(program.schema, start);

console.log(
  chalk.bold.blue(
    " ................ GraphQL Sample: Rapid GraphQL API Prototyping ................ "
  )
);
start();

process.on("SIGINT", () => {
  unwatchFile(program.schema, start);
  server && server.stop();
  process.exit(0);
});
