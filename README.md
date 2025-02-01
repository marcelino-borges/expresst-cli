# EXPRESST CLI

[![NPM Version](https://img.shields.io/npm/v/expresst-cli?color=blue&logo=nodedotjs&style=for-the-badge)](https://www.npmjs.com/package/expresst-cli)

## Table of contents

- [Description](#description)
- [Use](#use)
- [Tools](#tools)
  - [Generate](#generate)

## Description

This library was developed to facilitate developers lives with a series of commands that can be executed from the terminal living in a given project directory.

The goal here is to help start and grow a REST API made with [ExpressJS](https://expressjs.com) and Typescript.

The developer should have freedom to use both classic functional programming approach and Clean Architecture.

## Use

Open your terminal in any directory and run:

```bash
npx expresst-cli
```

### Help commands

To see the list with the main commands available:

```bash
npx expresst-cli help
```

To see the list with the GENERATE commands available:

```bash
npx expresst-cli help generate
```

## Tools

| Tool     | Desciption                                       |
| -------- | ------------------------------------------------ |
| Generate | Iteractively generates resources into a REST API |

## Generate

| Command (alias) | Desciption                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------ |
| Initialize (i)  | Generates a new Express entry file                                                         |
| Repository (re) | Generates a repository resource                                                            |
| Router (ro)     | Generates a router resource                                                                |
| Controller (c)  | Generates a controller resource                                                            |
| Service (s)     | Generates a service resource                                                               |
| Use Case (u)    | Generates an use-case resource                                                             |
| Adapter (a)     | Generates an adapter resource                                                              |
| Middleware (m)  | Generates a middleware resource                                                            |
| Resource (r)    | Generates a full resource, including controller, service, use-case, adapter and repository |

## License

[MIT](LICENSE)
