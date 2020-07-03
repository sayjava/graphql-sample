import { lstatSync, readdirSync, readFileSync } from "fs";
import { dirname, join } from "path";

export interface SkimahCLIConfig {
  typeDefs: string;
  sources: {
    [key: string]: {
      name: string;
      filepath: string;
      type: string;
    };
  };
}

export default ({ schema }: any): SkimahCLIConfig => {
  const project = dirname(schema);
  const files = readdirSync(project);
  const schemaStat = lstatSync(schema);

  if (!schemaStat.isFile()) {
    throw new Error(`${schema} is not a file`);
  }

  const config: SkimahCLIConfig = {
    typeDefs: readFileSync(schema).toString(),
    sources: {},
  };

  files.forEach((file) => {
    const [fileExt, fileName] = file.split(".").reverse();
    const dsName = fileName.toLowerCase();

    if (["csv", "json"].includes(fileExt)) {
      config.sources[dsName] = {
        name: dsName,
        type: fileExt,
        filepath: join(project, file),
      };
    }
  });

  return config;
};
