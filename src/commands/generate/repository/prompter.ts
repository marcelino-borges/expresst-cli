import { cyan } from "../../../utils/chalk";
import {
  handleForceCloseIfAny,
  promptDirOrFile,
  promptFunctionName,
  promptsUseIndexPattern,
} from "../../../utils/prompters";
import { generateRepository } from "./generator";

const CONTEXT = "Repository";

export const promptGenerateRepository = async () => {
  console.log(cyan("Generating an repository:"));

  try {
    const useIndex = await promptsUseIndexPattern();
    const useCaseName = await promptFunctionName(CONTEXT);
    const useCaseFile = await promptDirOrFile(CONTEXT, useIndex);

    generateRepository(useCaseFile, useCaseName, useIndex);
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};
