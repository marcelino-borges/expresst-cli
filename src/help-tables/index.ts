import { Table } from "console-table-printer";

export const getHelpCommandsTable = (disabledColumns?: string[]) =>
  new Table({
    columns: [
      { name: "command", alignment: "left", color: "red", title: "Command" },
      { name: "alias", alignment: "left", color: "yellow", title: "Alias" },
      {
        name: "description",
        alignment: "left",
        color: "cyan",
        title: "Description",
      },
    ],
    disabledColumns,
  });
