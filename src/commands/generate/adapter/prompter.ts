import { cyan } from "../../../utils/chalk";
import {
  handleForceCloseIfAny,
  promptDirOrFile,
  promptFunctionName,
  promptsUseIndexPattern,
} from "../../../utils/prompters";
import { generateAdapter } from "./generator";

const CONTEXT = "Adapter";

export const promptGenerateAdapter = async () => {
  console.log(cyan("Generating an adapter:"));

  try {
    const useIndex = await promptsUseIndexPattern();
    const adapterName = await promptFunctionName(CONTEXT);
    const adapterFile = await promptDirOrFile(CONTEXT, useIndex);

    generateAdapter(adapterFile, adapterName, useIndex);
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};
