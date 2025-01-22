import {
  CONTEXTS,
  TEMPLATES_PATH,
  TEMPLATES_PLACEHOLDERS,
} from "../../../constants";
import {
  concatenateToContent,
  concatenateToContentBeforeExports,
  createDirectoryIfNotExists,
  findExistingFile,
  getLibFileContent,
  replacePlaceholdersByValue,
  resolvePath,
  saveFile,
} from "../../../utils/files";
import { log } from "../../../utils/logs";

const getFunctionTemplate = () => {
  return getLibFileContent(TEMPLATES_PATH.useCaseFunction.originalPath);
};

const fillUseCaseNameIntoContent = (content: string, useCaseName: string) => {
  return replacePlaceholdersByValue(
    content,
    TEMPLATES_PLACEHOLDERS.functionName,
    useCaseName,
  );
};

export const generateUseCase = async (
  useCaseFile: string,
  useCaseName: string,
  useIndex: boolean,
) => {
  const cwdPath = process.cwd();

  const useCaseDestinationDir = resolvePath(
    cwdPath,
    TEMPLATES_PATH.useCaseFunction.destinationPath,
    useCaseFile,
  );

  const useCaseDestinationFile = resolvePath(
    useCaseDestinationDir,
    useIndex ? "index.ts" : `${useCaseFile}.ts`,
  );

  try {
    const functionTemplate = getFunctionTemplate();

    createDirectoryIfNotExists(useCaseDestinationDir);

    const existingUseCase = findExistingFile(useCaseDestinationFile);

    let updatedModuleContent = existingUseCase ?? "";

    updatedModuleContent = concatenateToContentBeforeExports(
      updatedModuleContent,
      functionTemplate,
    );
    updatedModuleContent = fillUseCaseNameIntoContent(
      updatedModuleContent,
      useCaseName,
    );

    await saveFile(useCaseDestinationFile, updatedModuleContent);
  } catch (error) {
    log.error(
      [CONTEXTS.generate, CONTEXTS.useCase],
      `Error generating use case ${useCaseName}: ${error}`,
    );
  }
};
