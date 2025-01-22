import {
  handleForceCloseIfAny,
  promptDirOrFile,
  promptFunctionName,
  promptsUseIndexPattern,
} from "../../../utils/prompters";
import { generateUseCase } from "./generator";

const CONTEXT = "UseCase";

export const promptGenerateUseCase = async () => {
  try {
    const useIndex = await promptsUseIndexPattern();
    const useCaseName = await promptFunctionName(CONTEXT);
    const useCaseFile = await promptDirOrFile(CONTEXT, useIndex);

    generateUseCase(useCaseFile, useCaseName, useIndex);
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};
