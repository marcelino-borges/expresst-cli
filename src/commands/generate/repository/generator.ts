import {
  CONTEXTS,
  TEMPLATES_PATH,
  TEMPLATES_PLACEHOLDERS,
} from "../../../constants";
import {
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
  return getLibFileContent(TEMPLATES_PATH.repositoryFunction.originalPath);
};

const fillRepositoryNameIntoContent = (
  content: string,
  repositoryName: string,
) => {
  return replacePlaceholdersByValue(
    content,
    TEMPLATES_PLACEHOLDERS.functionName,
    repositoryName,
  );
};

export const generateRepository = async (
  repositoryFile: string,
  repositoryName: string,
  useIndex: boolean,
) => {
  const cwdPath = process.cwd();

  const repositoryDestinationDir = resolvePath(
    cwdPath,
    TEMPLATES_PATH.repositoryFunction.destinationPath,
    repositoryFile,
  );

  const repositoryDestinationFile = resolvePath(
    repositoryDestinationDir,
    useIndex ? "index.ts" : `${repositoryFile}.ts`,
  );

  try {
    const functionTemplate = getFunctionTemplate();

    createDirectoryIfNotExists(repositoryDestinationDir);

    const existingUseCase = findExistingFile(repositoryDestinationFile);

    let updatedModuleContent = existingUseCase ?? "";

    updatedModuleContent = concatenateToContentBeforeExports(
      updatedModuleContent,
      functionTemplate,
    );
    updatedModuleContent = fillRepositoryNameIntoContent(
      updatedModuleContent,
      repositoryName,
    );

    await saveFile(repositoryDestinationFile, updatedModuleContent);
  } catch (error) {
    log.error(
      [CONTEXTS.generate, CONTEXTS.repository],
      `Error generating repository ${repositoryName}: ${error}`,
    );
  }
};

export const repositoryGeneratorTests = {
  getFunctionTemplate,
  fillRepositoryNameIntoContent,
};
