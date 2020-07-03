<h1 align="center" style="border-bottom: none;">📦🚀 graphql-sample</h1>
<p align="center">
<p align="center">
    Zero Coding, ⚡ Rapid GraphQL API prototyping
</p>
<p align="center">
<a href="#">
<img src="https://github.com/sayjava/graphql-sample/workflows/test/badge.svg" alt="CI Status">
</a>
</p>

## Features

- Zero coding required
- CRUD API for each defined type in the schema definition
- MongoDB/Hasura style filtering API
- Use your own sample data

## Quick Start

Create a type definition file and name it `schema.graphql` with the following content

```graphql
type User {
  userid: ID

  firstName: String @named(as: "name_firstName")
  lastName: String @named(as: "name_lastName")

  votes: [Vote!] @relation
}

type Vote {
  voteId: Int @unique
  timestamp: String @named(as: "date_recent")
  total: Int @nameD(as: "random_number")

  user: User @relation
}
```

and in the same folder run

```sh
npx @skimah/graphql-sample
```

The GraphQL server will be running at `http://localhost:8080/graphql`. It comes with an IDE to query in the browser or use `HTTP POST`

and you can run a sample query like

```graphql
{
  findUsers(limit: 2) {
    firstName
    lastName

    votes(where: { total: { gt: 400 } }) {
      total
      timestamp
    }
  }
}
```

or create a new user like

```graphql
mutation {
  createUsers(data: [{ userid: 2, firstName: "james", lastName: "bond" }]) {
    users {
      firstName
    }
  }
}
```

## Usage & Options

```sh
npx @skimah/graphql-sample --help
```

## Generating Sample Data

`@skimah/graphql-sample` uses the wonderful [faker.js](https://github.com/marak/Faker.js/) underneath to generate sample data for the type fields using the format `@named(as: "namespace_function")` where namespace can be e.g `name` and function can be `firstName`

See the full list of available faker.js functions here at [faker.js namespaces and functions](https://rawgit.com/Marak/faker.js/master/examples/browser/index.html)

`namespace_function` examples are: -

- address_country
- commerce_department
- company_bs
- date_past
- finance_iban
- internet_email
- image_city

See [faker.js namespaces and functions](https://rawgit.com/Marak/faker.js/master/examples/browser/index.html)

## Advance Usage

### Relationships

You can use the `@relation` directive to create a relationship between two types. Each type must have at least one unique field using `@unique` or `GraphQL ID`

### BYOD (bring your own data)

if you would rather use your own sample data, any `json` or `csv` file in the same directory as your schema file can be referenced in your type definition.

For example, if you have a csv file in the same folder as your schema named `users.csv` with the following content

| id  | name  | title   |
| --- | ----- | ------- |
| 1   | james | manager |
| 2   | bond  | agent   |

then you can reference the file in your type definition as

```graphql
type User @datasource(name: "users") {
  id: ID
  name: String
  title: String
}
```

## Links

- [Skimah Library](https://docs.skimah.dev/#/)
- [Faker.js](https://github.com/marak/Faker.js/)

## Maintainer

[Raymond Ottun]("http://github.com/sayjava)
