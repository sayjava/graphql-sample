import loadConfig from "../src/config";

test("validity of schema file", () => {
  expect(() => loadConfig({ schema: "examples" })).toThrowError(
    "examples is not a file"
  );
});

test("read schema file", () => {
  const config = loadConfig({ schema: "examples/simple/schema.graphql" });
  expect(config.typeDefs).toContain("type User");
});

test("read sources", () => {
  const config = loadConfig({ schema: "examples/chinook/schema.graphql" });
  expect(config.sources).toEqual({
    album: {
      name: "album",
      filepath: "examples/chinook/album.csv",
      type: "csv",
    },
    customer: {
      name: "customer",
      filepath: "examples/chinook/customer.json",
      type: "json",
    },
    employee: {
      name: "employee",
      filepath: "examples/chinook/employee.json",
      type: "json",
    },
  });
});
