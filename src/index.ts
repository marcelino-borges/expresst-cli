#!/usr/bin/env node
import { select } from "@inquirer/prompts";

import { showGenerateCommands } from "./commands/generate/helper";
import { promptGenerateCommand } from "./commands/generate/prompter";
import { MAIN_COMMANDS } from "./constants";
import { CONTEXTS } from "./constants";
import { showMainCommands } from "./helper";
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

const executeMainFlow = async (args: string[]) => {
  try {
    const commandName = await promptMainCommandName();

    const command = MAIN_COMMANDS.find(
      (command) => command.command === commandName,
    );

    if (!command) {
      log.error([CONTEXTS.chooseMainCommand], "Invalid command.");
      start(args);
      return;
    }

    command.promptCallback();
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};

const start = async (args: string[]) => {
  const [primaryArg, ...otherArgs] = args;

  if (!args.length) {
    executeMainFlow(args);
    return;
  }

  if (primaryArg === "help") {
    if (!otherArgs.length) {
      showMainCommands();
    } else if (otherArgs[0] === "generate" || otherArgs[0] === "g") {
      showGenerateCommands();
    }

    return;
  } else if (primaryArg === "generate" || primaryArg === "g") {
    await promptGenerateCommand(otherArgs);
    return;
  } else if (primaryArg === "format") {
    console.log("COMMING SOON!");
    return;
  } else {
    log.error([CONTEXTS.chooseMainCommand], "Invalid command. Try again.");
    return;
  }
};

const bootstrap = async () => {
  console.log("\n\nWelcome to");
  console.log(getLogo());

  const args = process.argv.slice(2);

  await start(args);
};

bootstrap();
