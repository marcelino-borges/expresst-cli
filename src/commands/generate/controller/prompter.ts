import {
  handleForceCloseIfAny,
  promptDirOrFile,
  promptFunctionName,
  promptsUseIndexPattern,
} from "../../../utils/prompters";
import { generateController } from "./generator";

const CONTEXT = "Controller";

export const promptGenerateController = async () => {
  try {
    const useIndex = await promptsUseIndexPattern();
    const controllerName = await promptFunctionName(CONTEXT);
    const controllerFile = await promptDirOrFile(CONTEXT, useIndex);

    generateController(controllerFile, controllerName, useIndex);
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};
