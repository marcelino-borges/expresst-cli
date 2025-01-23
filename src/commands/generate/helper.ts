import chalk from "chalk";

import { getHelpCommandsTable } from "../../help-tables";
import { GENERATE_COMMANDS } from "./constants";

const table = getHelpCommandsTable(["promptCallback"]).addRows(
  GENERATE_COMMANDS,
);

export const showGenerateCommands = () => {
  console.log(chalk.red("Express API CLI Main commands"), "\n");
  console.log(chalk.gray("See our GENERATE commands below:"));
  table.printTable();
};
