import { input, select } from "@inquirer/prompts";

import { yellow } from "../../../utils/chalk";
import {
  handleForceCloseIfAny,
  promptDirOrFile,
  promptFunctionName,
  promptsUseIndexPattern,
  showUserAnswer,
} from "../../../utils/prompters";
import { generateRouter } from "./generator";

const CONTEXT = "Router";

const promptMethodName = async () => {
  const selection = await select({
    message: `What's the ${CONTEXT.toLowerCase()}'s ${yellow("HTTP method")}?`,
    choices: [
      {
        name: "GET",
        value: "get",
      },
      {
        name: "POST",
        value: "post",
      },
      {
        name: "PUT",
        value: "put",
      },
      {
        name: "DELETE",
        value: "delete",
      },
      {
        name: "PATCH",
        value: "patch",
      },
    ],
    default: "get",
    loop: true,
  });
  showUserAnswer(`HTTP method:`, selection);

  return selection;
};

const promptPath = async () => {
  let path = await input({
    message: `What's the router's ${yellow("path")}?`,
    default: "/my-path/:id",
  });
  showUserAnswer("Path:", path);
  path = `/${path}`;

  const startingSlashesRegex = /\/{2,}/g;

  path = path.replace(startingSlashesRegex, "/");

  return path;
};

export const promptGenerateRouter = async () => {
  try {
    const useIndex = await promptsUseIndexPattern();
    const routerFile = await promptDirOrFile(CONTEXT, useIndex);
    const routerMethod = await promptMethodName();
    const routerPath = await promptPath();

    generateRouter(routerFile, routerMethod, routerPath, useIndex);
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};
