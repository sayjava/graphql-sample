import { lstatSync, readdirSync, readFileSync } from "fs";
import { dirname, join } from "path";

export interface SkimahCLIConfig {
  schema: string;
  sources: {
    [key: string]: {
      filePath: string;
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
    schema: readFileSync(schema).toString(),
    sources: {},
  };

  files.forEach((file) => {
    const [fileExt, fileName] = file.split(".").reverse();
    const dsName = fileName.toLowerCase();

    if (["csv", "json"].includes(fileExt)) {
      config.sources[dsName] = {
        type: fileExt,
        filePath: join(project, file),
      };
    }
  });

  return config;
};
