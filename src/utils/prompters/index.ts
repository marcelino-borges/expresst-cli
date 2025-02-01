import { input } from "@inquirer/prompts";

import { gray, yellow } from "../../utils/chalk";
import { capitalizeFirstLetter } from "../../utils/strings";

/**
 * Handles gracefully the error thrown when a user forces to close
 * a prompt with `CTRL + C`.
 *
 * @param error Error thrown by a `try-catch` block during the prompt process.
 */
export const handleForceCloseIfAny = (error: any) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("Cancelled, see you next time! 👋👋👋");
  } else {
    throw error;
  }
};

/**
 * Logs to console the question asked to the user and the answer provided
 * with a custom color.
 *
 * @param question Question asked to the user.
 * @param answer Answer provided by the user.
 */
export const showUserAnswer = (question: string, answer: string) => {
  console.info(`${gray(question)} ${answer}\n`);
};

/**
 * Prompts the user if the would like to use a given `tool`.
 *
 * @param tool Name of the tool to ask.
 * @param defaultAnswer Default answer used if the user submits the prompt
 * without providing any.
 * @returns The answer of the user to the prompt.
 */
export const promptsUseTool = async (
  tool: string,
  defaultAnswer?: "y" | "n",
) => {
  return await input({
    message: `Use ${yellow(tool)} (y/n):`,
    default: defaultAnswer ?? "y",
  });
};

/**
 * Prompts the user if he wants to use the index pattern or not.
 * The index pattern is used to create a directory with an `index.ts` file,
 * where the name of the resource is applied to the directory name
 * and the file inside is kept just as `index.ts`.
 *
 * @returns `true` or `false` for the user's answer.
 */
export const promptsUseIndexPattern = async () => {
  const indexAnswer = await promptsUseTool("index pattern");
  showUserAnswer("Use index pattern?", indexAnswer);
  return indexAnswer === "y";
};

/**
 * Prompts the user for the name of the function for a given context where
 * the lib needs to do something with a function.
 *
 * @param functionContext Context of the function.
 * @returns The answer of the user with the name of the function.
 */
export const promptFunctionName = async (functionContext: string) => {
  const capitalizedFunctionContext = capitalizeFirstLetter(functionContext);

  const serviceName = await input({
    message: `What's the ${functionContext.toLowerCase()}'s ${yellow("function name")}`,
    default: `my${capitalizedFunctionContext}`,
  });
  showUserAnswer(`${capitalizedFunctionContext}'s name:`, serviceName);

  return serviceName;
};

/**
 * Prompts the user for the name of an specific file or directory for a
 * given context where the lib needs to create a file or directory.
 *
 * @param usesIndex the user wants to use the index pattern or not.
 *
 * @returns `true` or `false` for the user's answer.
 */
export const promptDirOrFile = async (
  dirOrFileContext: string,
  usesIndex: boolean,
) => {
  const capitalizedDirOrFileContext = capitalizeFirstLetter(dirOrFileContext);
  const lowCaseDirOrFileContext = dirOrFileContext
    .toLowerCase()
    .replace(" ", "-");
  const dirOrFile = !usesIndex ? "file" : "directory";

  const controllerFile = await input({
    message: `What's the ${lowCaseDirOrFileContext}'s ${yellow(`${dirOrFile} name`)}`,
    default: `my-${lowCaseDirOrFileContext}`,
  });
  showUserAnswer(
    `${capitalizedDirOrFileContext}'s ${dirOrFile}`,
    controllerFile,
  );

  return controllerFile;
};
