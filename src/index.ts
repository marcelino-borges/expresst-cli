#!/usr/bin/env node
import { select } from "@inquirer/prompts";

import { MAIN_COMMANDS } from "./constants";
import { CONTEXTS } from "./constants";
import { yellow } from "./utils/chalk";
import { log } from "./utils/logs";
import { handleForceCloseIfAny, showUserAnswer } from "./utils/prompters";
import { getLogo } from "./utils/strings";

const promptMainCommandName = async () => {
  const actionsChoices = MAIN_COMMANDS.map((command) => ({
    name: command.command,
    value: command.command,
    description: command.description,
  }));

  const commandName = await select({
    message: `Choose today's ${yellow("action")}:`,
    choices: actionsChoices,
    loop: true,
  });
  showUserAnswer(`Selected action`, commandName);

  return commandName;
};

const start = async () => {
  try {
    const commandName = await promptMainCommandName();

    const command = MAIN_COMMANDS.find(
      (command) => command.command === commandName,
    );

    if (!command) {
      log.error([CONTEXTS.chooseMainCommand], "Invalid command.");
      start();
      return;
    }

    command.promptCallback();
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};

const getUserPreferences = async () => {
  console.log("\n\nWelcome to");
  console.log(getLogo());

  const args = process.argv.slice(2);

  console.log("args: ", args);

  start();
};

getUserPreferences();
