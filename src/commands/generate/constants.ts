import { CommandInfo } from "../../types";
import { promptGenerateAdapter } from "./adapter/prompter";
import { promptGenerateController } from "./controller/prompter";
import { promptGenerateInit } from "./init/prompter";
import { promptGenerateMiddleware } from "./middleware/prompter";
import { promptGenerateRepository } from "./repository/prompter";
import { promptGenerateRouter } from "./router/prompter";
import { promptGenerateService } from "./service/prompter";
import { promptGenerateUseCase } from "./use-case/prompter";

export const GENERATE_COMMANDS: CommandInfo[] = [
  {
    command: "Initialize",
    alias: "i",
    description: "Generates a new Express entry file",
    promptCallback: promptGenerateInit,
  },
  {
    command: "Repository",
    alias: "re",
    description: "Generates a repository resource",
    promptCallback: promptGenerateRepository,
  },
  {
    command: "Router",
    alias: "ro",
    description: "Generates a router resource",
    promptCallback: promptGenerateRouter,
  },
  {
    command: "Controller",
    alias: "c",
    description: "Generates a controller resource",
    promptCallback: promptGenerateController,
  },
  {
    command: "Service",
    alias: "s",
    description: "Generates a service resource",
    promptCallback: promptGenerateService,
  },
  {
    command: "Use Case",
    alias: "u",
    description: "Generates an use-case resource",
    promptCallback: promptGenerateUseCase,
  },
  {
    command: "Adapter",
    alias: "a",
    description: "Generates an adapter resource",
    promptCallback: promptGenerateAdapter,
  },
  {
    command: "Middleware",
    alias: "m",
    description: "Generates a middleware resource",
    promptCallback: promptGenerateMiddleware,
  },
  {
    command: "Resource",
    alias: "r",
    description:
      "Generates a full resource, including controller, service, use-case, adapter and repository",
    promptCallback: () => {
      console.log("COMMING SOON!");
    },
  },
];
