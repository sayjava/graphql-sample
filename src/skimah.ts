import { generate } from "@skimah/api";
import CSVSource from "@skimah/ds-csv";
import SampleSource from "@skimah/ds-faker";
import JSONSource from "@skimah/ds-json";
import { SkimahCLIConfig } from "./config";

export default async (config: SkimahCLIConfig) => {
  const sources = { default: new SampleSource({ recordMaximum: 100 }) };

  Object.values(config.sources).forEach((src) => {
    switch (src.type) {
      case "csv":
        return (sources[src.name] = new CSVSource(src));

      case "json":
        return (sources[src.name] = new JSONSource(src));

      default:
        throw new Error(`Unknown Type ${src.type}`);
    }
  });

  const result = await generate({
    typeDefs: config.typeDefs,
    sources,
  });

  return result;
};
