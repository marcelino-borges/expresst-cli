import { CommandInfo } from "../../types";
import chalk from "chalk";
import { getHelpCommandsTable } from "..";

const mainCommands: CommandInfo[] = [
  {
    command: "Generate",
    alias: "g",
    description: "Generates a new resource",
  },
];

const table = getHelpCommandsTable().addRows(mainCommands);

const showCommands = () => {
  console.log(chalk.red("Express API CLI Main commands"), "\n");
  console.log(chalk.gray("See our MAIN commands below:"));
  table.printTable();
  console.log(
    chalk.gray("Run"),
    chalk.yellow("npx express-api-cli <command> --help"),
    chalk.gray("for more information about an specific command"),
  );
};

showCommands();
