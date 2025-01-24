import { LIB_PROMPT_NAME } from "../../constants";
import { cyan, gray, green, red } from "../chalk";

const buildContextsString = (contexts: string[]) => {
  let contextsString = "";

  for (const context of contexts) {
    contextsString += `[${gray(context)}]`;
  }

  return contextsString;
};

const error = (contexts: string[], message: string) => {
  const contextsString = buildContextsString(contexts);

  console.error(
    `\n${LIB_PROMPT_NAME}${contextsString}[${red("error")}]:\n${message}`,
  );
};

const info = (contexts: string[], message: string) => {
  const contextsString = buildContextsString(contexts);

  console.info(
    `\n${LIB_PROMPT_NAME}${contextsString}[${cyan("info")}]:\n${message}`,
  );
};

const success = (contexts: string[], message: string) => {
  const contextsString = buildContextsString(contexts);

  console.log(
    `\n${LIB_PROMPT_NAME}${contextsString}[${green("success")}]:\n${message}`,
  );
};

export const log = {
  error,
  info,
  success,
};
