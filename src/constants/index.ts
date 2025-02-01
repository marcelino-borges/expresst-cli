import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { promptGenerateCommand } from "../commands/generate/prompter";
import { CommandInfo } from "../types";
import { red } from "../utils/chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const GENERATE_PATH = resolve(
  __dirname,
  "../commands/generate/init/index.ts",
);

export const MAIN_COMMANDS: CommandInfo[] = [
  {
    command: "Generate",
    alias: "generate (g)",
    description: "Generates a new resource",
    promptCallback: promptGenerateCommand,
  },
  {
    command: "Format",
    alias: "format (f)",
    description: "Format all files with Prettier",
    promptCallback: () => {},
  },
  {
    command: "Help",
    alias: "help",
    description: "See the options available by Expresst CLI",
    promptCallback: () => {},
  },
];

export const CONTEXTS = {
  chooseMainCommand: "mainCommandChoice",
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
  adapter: "adapter",
  middleware: "middleware",
  repository: "repository",
};

export const TEMPLATES_PATH = {
  serverEntry: {
    originalPath: resolve(__dirname, "../templates/server-entry/index.txt"),
    destinationPath: "/src/index.ts",
  },
  packageJson: {
    originalPath: resolve(__dirname, "../templates/npm/packagejson.txt"),
    destinationPath: "/package.json",
  },
  commitlint: {
    originalPath: resolve(__dirname, "../templates/lint/commitlint.config.txt"),
    destinationPath: "/commitlint.config.cjs",
  },
  swaggerLoader: {
    originalPath: resolve(__dirname, "../templates/swagger/loader.txt"),
    destinationPath: "/src/config/swagger/loader.ts",
  },
  swaggerYml: {
    originalPath: resolve(__dirname, "../templates/swagger/yml.txt"),
    destinationPath: "/src/config/swagger/doc.yml",
  },
  tsconfig: {
    originalPath: resolve(__dirname, "../templates/typescript/tsconfig.txt"),
    destinationPath: "/tsconfig.json",
  },
  huskyPreCommit: {
    originalPath: resolve(__dirname, "../templates/husky/pre-commit.txt"),
    destinationPath: "/.husky/pre-commit",
  },
  huskyCommitMsg: {
    originalPath: resolve(__dirname, "../templates/husky/commit-msg.txt"),
    destinationPath: "/.husky/commit-msg",
  },
  gitIgnore: {
    originalPath: resolve(__dirname, "../templates/git/gitignore.txt"),
    destinationPath: "/.gitignore",
  },
  controllerWrapper: {
    originalPath: resolve(__dirname, "../templates/controller/wrapper.txt"),
    destinationPath: "./src/controllers",
  },
  controllerFunction: {
    originalPath: resolve(__dirname, "../templates/controller/function.txt"),
    destinationPath: "./src/controllers",
  },
  middlewareWrapper: {
    originalPath: resolve(__dirname, "../templates/middleware/wrapper.txt"),
    destinationPath: "./src/middlewares",
  },
  middlewareFunction: {
    originalPath: resolve(__dirname, "../templates/middleware/function.txt"),
    destinationPath: "./src/middlewares",
  },
  serviceFunction: {
    originalPath: resolve(__dirname, "../templates/service/function.txt"),
    destinationPath: "./src/services",
  },
  useCaseFunction: {
    originalPath: resolve(__dirname, "../templates/use-case/function.txt"),
    destinationPath: "./src/use-cases",
  },
  repositoryFunction: {
    originalPath: resolve(__dirname, "../templates/repository/function.txt"),
    destinationPath: "./src/repositories",
  },
  routerWrapper: {
    originalPath: resolve(__dirname, "../templates/router/wrapper.txt"),
    destinationPath: "./src/routers",
  },
  routerImplementation: {
    originalPath: resolve(__dirname, "../templates/router/function.txt"),
    destinationPath: "./src/routers",
  },
  adapterFunction: {
    originalPath: resolve(__dirname, "../templates/adapter/function.txt"),
    destinationPath: "./src/adapters",
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
  middlewareFunction: "{{MIDDLEWARE_FUNCTION}}",
};

export const LIB_PROMPT_NAME = red("expresst-cli");
