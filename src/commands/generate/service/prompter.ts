import {
  handleForceCloseIfAny,
  promptDirOrFile,
  promptFunctionName,
  promptsUseIndexPattern,
} from "../../../utils/prompters";
import { generateService } from "./generator";

const CONTEXT = "Service";

const getUserPreferences = async () => {
  try {
    const useIndex = await promptsUseIndexPattern();
    const controllerName = await promptFunctionName(CONTEXT);
    const controllerFile = await promptDirOrFile(CONTEXT, useIndex);

    generateService(controllerFile, controllerName, useIndex);
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};

getUserPreferences();
