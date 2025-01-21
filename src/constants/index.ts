import path from "path";

import { red } from "../utils/chalk";

export const GENERATE_PATH = path.resolve(
  __dirname,
  "../commands/generate/init/index.ts",
);

export const CONTEXTS = {
  generate: "generate",
  init: "init",
  prodDependencies: "production dependencies",
  devDependencies: "dev dependencies",
  npmInit: "npm init",
  commitLint: "commitlint",
  swagger: "swagger",
  tsconfig: "tsconfig",
  husky: "husky",
  git: "git",
  prompter: "prompter",
  projectName: "projectName",
  controller: "controller",
  service: "service",
  useCase: "useCase",
};

export const TEMPLATES_PATH = {
  serverEntry: {
    originalPath: path.resolve(
      __dirname,
      "../templates/server-entry/index.txt",
    ),
    destinationPath: "/src/index.ts",
  },
  packageJson: {
    originalPath: path.resolve(__dirname, "../templates/npm/packagejson.txt"),
    destinationPath: "/package.json",
  },
  commitlint: {
    originalPath: path.resolve(
      __dirname,
      "../templates/lint/commitlint.config.txt",
    ),
    destinationPath: "/commitlint.config.cjs",
  },
  swaggerLoader: {
    originalPath: path.resolve(__dirname, "../templates/swagger/loader.txt"),
    destinationPath: "/src/config/swagger/loader.ts",
  },
  swaggerYml: {
    originalPath: path.resolve(__dirname, "../templates/swagger/yml.txt"),
    destinationPath: "/src/config/swagger/doc.yml",
  },
  tsconfig: {
    originalPath: path.resolve(
      __dirname,
      "../templates/typescript/tsconfig.txt",
    ),
    destinationPath: "/tsconfig.json",
  },
  huskyPreCommit: {
    originalPath: path.resolve(__dirname, "../templates/husky/pre-commit.txt"),
    destinationPath: "/.husky/pre-commit",
  },
  huskyCommitMsg: {
    originalPath: path.resolve(__dirname, "../templates/husky/commit-msg.txt"),
    destinationPath: "/.husky/commit-msg",
  },
  gitIgnore: {
    originalPath: path.resolve(__dirname, "../templates/git/gitignore.txt"),
    destinationPath: "/.gitignore",
  },
  controllerWrapper: {
    originalPath: path.resolve(
      __dirname,
      "../templates/controller/wrapper.txt",
    ),
    destinationPath: "./src/controllers",
  },
  controllerFunction: {
    originalPath: path.resolve(
      __dirname,
      "../templates/controller/function.txt",
    ),
    destinationPath: "./src/controllers",
  },
  serviceFunction: {
    originalPath: path.resolve(__dirname, "../templates/service/function.txt"),
    destinationPath: "./src/services",
  },
  useCaseFunction: {
    originalPath: path.resolve(__dirname, "../templates/use-case/function.txt"),
    destinationPath: "./src/use-cases",
  },
  routerWrapper: {
    originalPath: path.resolve(__dirname, "../templates/router/wrapper.txt"),
    destinationPath: "./src/routers",
  },
  routerImplementation: {
    originalPath: path.resolve(__dirname, "../templates/router/function.txt"),
    destinationPath: "./src/routers",
  },
};

export const TEMPLATES_PLACEHOLDERS = {
  projectName: "{{PROJECT_NAME}}",
  controllerName: "{{CONTROLLER_NAME}}",
  controllerFunction: "{{CONTROLLER_FUNCTION}}",
  functionName: "{{FUNCTION_NAME}}",
  routeImplementation: "{{ROUTE_IMPLEMENTATION}}",
  routeMethod: "{{ROUTE_METHOD}}",
  routePath: "{{ROUTE_PATH}}",
};

export const LIB_PROMPT_NAME = red("rest-express-cli");
