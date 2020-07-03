import loadConfig from "../src/config";

test("validity of schema file", () => {
  expect(() => loadConfig({ schema: "examples" })).toThrowError(
    "examples is not a file"
  );
});

test("read schema file", () => {
  const config = loadConfig({ schema: "examples/simple/schema.graphql" });
  expect(config.schema).toContain("type User");
});

test("read sources", () => {
  const config = loadConfig({ schema: "examples/chinook/schema.graphql" });
  expect(config.sources).toEqual({
    album: { filePath: "examples/chinook/album.csv", type: "csv" },
    customer: { filePath: "examples/chinook/customer.json", type: "json" },
    employee: { filePath: "examples/chinook/employee.json", type: "json" },
  });
});
