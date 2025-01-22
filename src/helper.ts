import chalk from "chalk";

import { MAIN_COMMANDS } from "./constants";
import { getHelpCommandsTable } from "./help-tables";

const table = getHelpCommandsTable(["promptCallback"]).addRows(MAIN_COMMANDS);

export const showMainCommands = () => {
  console.log(chalk.red("Express API CLI Main commands"), "\n");
  console.log(chalk.gray("See our MAIN commands below:"));
  table.printTable();
  console.log(
    chalk.gray("Run"),
    chalk.yellow("npx express-api-cli <command> --help"),
    chalk.gray("for more information about an specific command"),
  );
};
