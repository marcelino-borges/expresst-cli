# EXPRESST CLI

This library was developed to facilitate developers lives with a series of commands that can be executed from the terminal living in a given project directory.

The goal here is to help start and grow a REST API made with [ExpressJS](https://expressjs.com) and Typescript.

The developer should have freedom to use both classic functional programming approach and Clean Architecture.

## Main Tools

| Tool     | Desciption                                                             |
| -------- | ---------------------------------------------------------------------- |
| Generate | Iteractively generates resources into a REST API                       |
| Format   | Uses Prettier to format a whole codebase or specific directories/files |

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

## Release

Soon this library will have an official release, but for now it's under development.
