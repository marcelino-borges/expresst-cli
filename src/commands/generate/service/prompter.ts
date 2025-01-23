import { cyan } from "../../../utils/chalk";
import {
  handleForceCloseIfAny,
  promptDirOrFile,
  promptFunctionName,
  promptsUseIndexPattern,
} from "../../../utils/prompters";
import { generateService } from "./generator";

const CONTEXT = "Service";

export const promptGenerateService = async () => {
  console.log(cyan("Generating a service:"));

  try {
    const useIndex = await promptsUseIndexPattern();
    const controllerName = await promptFunctionName(CONTEXT);
    const controllerFile = await promptDirOrFile(CONTEXT, useIndex);

    generateService(controllerFile, controllerName, useIndex);
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};
