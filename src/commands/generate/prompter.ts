#!/usr/bin/env node
import { select } from "@inquirer/prompts";

import { CONTEXTS } from "../../constants";
import { yellow } from "../../utils/chalk";
import { log } from "../../utils/logs";
import { handleForceCloseIfAny, showUserAnswer } from "../../utils/prompters";
import { GENERATE_COMMANDS } from "./constants";

const promptGenerateName = async () => {
  const choices = GENERATE_COMMANDS.map((command) => ({
    name: command.command,
    value: command.command,
    description: command.description,
  }));

  const selection = await select({
    message: `Choose what you want to ${yellow("generate")}:`,
    choices: choices,
    loop: true,
  });
  showUserAnswer(`Selected action`, selection);

  return selection;
};

export var promptGenerateCommand = async (args?: string[]) => {
  try {
    let commandSelected: string | undefined;

    if (!args?.length) {
      commandSelected = await promptGenerateName();
    } else {
      const [secondaryArg] = args;
      commandSelected = secondaryArg;
    }

    if (!commandSelected) {
      log.error([CONTEXTS.generate], "Invalid command");
      return;
    }

    const selectedCommand = GENERATE_COMMANDS.find(
      (command) =>
        command.command === commandSelected ||
        command.alias === commandSelected,
    );

    if (!selectedCommand) {
      log.error([CONTEXTS.generate], "Invalid command");
      return;
    }

    selectedCommand.promptCallback();
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};
