# WaveZync NestJS Starter

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

In this starter you may find a working application pre configured with the PostgreSQL and JWT Auth.

Please go through [Nest Docs](https://docs.nestjs.com/) before playing with the code.

## Installation

To run the application you need to have **PostgreSQL** installed.

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

### Running the app with docker :whale:

With Docker you can run it easily. Now port `3000` will be open and `9229` can be connected to debugger as well.

**PostgreSQL** is exposed via `5432` port.

```bash
$ docker-compose up
```

## Project Setup

The project setup follows standard NestJS conventions. Checkout NestJS docs for more.

### Directory structure

Directory structure follows module based on features.

```bash
src
├── @types # type defs goes here
├── common # common stuffs
│   ├── decorators # custom decorators
│   ├── dto # common DTOs
│   ├── exceptions # exceptions
│   ├── filters # filters for app
│   └── guards # guards for app
├── config # app config
├── database # database module
│   ├── migrations # db migrations
│   └── stubs # migration/seed stubs
└── modules # modules of app
    ├── auth # auth module
    │   └── dto
    ├── health # health module
    └── user # user module
        ├── dto
        └── entities
```

### Database and ORM

For database we have used PostgreSQL. And for ORM we have used [Knex.js](https://knexjs.org) with [ObjectionJS](https://vincit.github.io/objection.js).

Knex is an awesome query builder which is closer to SQL. Objection also a thin wrapper around Knex.

For all database migrations please use `snake_case` conversion when creating tables or columns.
In PostgreSQL it is natural to work with `snake_case` when writing queries.

Knex will automatically map your `snake_case` names into `camelCase` on application side. Dont use `snake_case` in JS side. Instead always use `camelCase`. Read [more](https://vincit.github.io/objection.js/recipes/snake-case-to-camel-case-conversion.html)

> Please change the database name in docker-compose file and .env

### Api Docs

Api docs can be geneated thanks to `@nestjs/swagger` package. Since we are using `cli` plugin you can comment your `Dto`s with JSDocs and the documentation will be done automatically. Please follow conventions mentioned [here](https://docs.nestjs.com/openapi/cli-plugin)

- Access swagger docs at <http://localhost:3000/api-docs>
- Access swagger.json at <http://localhost:3000/api-docs-json>

### Environment variables

| Env Variable  | Description                  | example                                         |
| ------------- | ---------------------------- | ----------------------------------------------- |
| SECRET        | Secret for JWT               | somesecret                                      |
| DATABASE_URL  | PostgreSQL connection string | postgres://admin:admin@localhost:5432/syetalabs |
| LOGGER_LEVEL  | Level of logger              | info                                            |
| LOGGER_FORMAT | Format for logging           | pretty or json                                  |

### VS Code helpers

You can find helpers by pressing `CTRL + SHIFT + P` in VSCode
