import chalk from "chalk";

import { CommandInfo } from "@/types";

import { getHelpCommandsTable } from "..";

const generateOptions: CommandInfo[] = [
  {
    command: "Initialize",
    alias: "init",
    description: "Generates a new Express entry file",
  },
  {
    command: "Router",
    alias: "r",
    description: "Generates a router resource",
  },
  {
    command: "Controller",
    alias: "c",
    description: "Generates a controller resource",
  },
  {
    command: "Service",
    alias: "s",
    description: "Generates a service resource",
  },
  {
    command: "Use Case",
    alias: "us",
    description: "Generates an use-case resource",
  },
  {
    command: "Adapter",
    alias: "a",
    description: "Generates an adapter resource",
  },
  {
    command: "Middleware",
    alias: "m",
    description: "Generates a middleware resource",
  },
  {
    command: "Commitlint",
    alias: "clint",
    description: "Setups commitlint in your project",
  },
  {
    command: "NPM Init",
    alias: "npm",
    description: "Runs NPM Init with basic dependencies",
  },
];

const table = getHelpCommandsTable().addRows(generateOptions);

const showCommands = () => {
  console.log(chalk.red("Express API CLI Main commands"), "\n");
  console.log(chalk.gray("See our GENERATE commands below:"));
  table.printTable();
};

showCommands();
