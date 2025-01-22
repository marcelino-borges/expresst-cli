import {
  CONTEXTS,
  TEMPLATES_PATH,
  TEMPLATES_PLACEHOLDERS,
} from "../../../constants";
import {
  concatenateToContent,
  createDirectoryIfNotExists,
  findExistingFile,
  getLibFileContent,
  replacePlaceholdersByValue,
  resolvePath,
  saveFile,
} from "../../../utils/files";
import { log } from "../../../utils/logs";

const getFunctionTemplate = () => {
  return getLibFileContent(TEMPLATES_PATH.adapterFunction.originalPath);
};

const fillAdapterNameIntoContent = (content: string, adapterName: string) => {
  return replacePlaceholdersByValue(
    content,
    TEMPLATES_PLACEHOLDERS.functionName,
    adapterName,
  );
};

export const generateAdapter = async (
  adapterFile: string,
  adapterName: string,
  useIndex: boolean,
) => {
  const cwdPath = process.cwd();

  const adapterDestinationDir = resolvePath(
    cwdPath,
    TEMPLATES_PATH.adapterFunction.destinationPath,
    adapterFile,
  );

  const adapterDestinationFile = resolvePath(
    adapterDestinationDir,
    useIndex ? "index.ts" : `${adapterFile}.ts`,
  );

  try {
    const functionTemplate = getFunctionTemplate();

    createDirectoryIfNotExists(adapterDestinationDir);

    const existingUseCase = findExistingFile(adapterDestinationFile);

    let updatedModuleContent = existingUseCase ?? "";

    updatedModuleContent = concatenateToContent(
      updatedModuleContent,
      functionTemplate,
    );
    updatedModuleContent = fillAdapterNameIntoContent(
      updatedModuleContent,
      adapterName,
    );

    await saveFile(adapterDestinationFile, updatedModuleContent);
  } catch (error) {
    log.error(
      [CONTEXTS.generate, CONTEXTS.adapter],
      `Error generating adapter ${adapterName}: ${error}`,
    );
  }
};
