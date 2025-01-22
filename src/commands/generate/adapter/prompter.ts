import {
  handleForceCloseIfAny,
  promptDirOrFile,
  promptFunctionName,
  promptsUseIndexPattern,
} from "../../../utils/prompters";
import { generateAdapter } from "./generator";

const CONTEXT = "Adapter";

export const promptGenerateAdapter = async () => {
  try {
    const useIndex = await promptsUseIndexPattern();
    const adapterName = await promptFunctionName(CONTEXT);
    const adapterFile = await promptDirOrFile(CONTEXT, useIndex);

    generateAdapter(adapterFile, adapterName, useIndex);
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};
