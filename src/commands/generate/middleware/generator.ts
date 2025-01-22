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

const getMiddlewareFunctionTemplate = () => {
  return getLibFileContent(TEMPLATES_PATH.middlewareFunction.originalPath);
};

const getWrapperTemplate = () => {
  return getLibFileContent(TEMPLATES_PATH.middlewareWrapper.originalPath);
};

const fillMiddlewareFunctionIntoWrapper = (
  content: string,
  functionTemplate: string,
) => {
  return replacePlaceholdersByValue(
    content,
    TEMPLATES_PLACEHOLDERS.middlewareFunction,
    functionTemplate,
  );
};

const fillMiddlewareNameIntoContent = (
  content: string,
  middlewareName: string,
) => {
  return replacePlaceholdersByValue(
    content,
    TEMPLATES_PLACEHOLDERS.functionName,
    middlewareName,
  );
};

export const generateMiddleware = async (
  middlewareFile: string,
  middlewareName: string,
  useIndex: boolean,
) => {
  const cwdPath = process.cwd();

  const middlewareDestinationDir = resolvePath(
    cwdPath,
    TEMPLATES_PATH.middlewareWrapper.destinationPath,
    middlewareFile,
  );

  const middlewareDestinationFile = resolvePath(
    middlewareDestinationDir,
    useIndex ? "index.ts" : `${middlewareFile}.ts`,
  );

  try {
    const functionTemplate = getMiddlewareFunctionTemplate();

    createDirectoryIfNotExists(middlewareDestinationDir);

    const existingMiddleware = findExistingFile(middlewareDestinationFile);

    let updatedModuleContent = existingMiddleware;

    if (existingMiddleware) {
      updatedModuleContent = concatenateToContentBeforeExports(
        existingMiddleware,
        functionTemplate,
      );
    } else {
      updatedModuleContent = getWrapperTemplate();
      updatedModuleContent = fillMiddlewareFunctionIntoWrapper(
        updatedModuleContent,
        functionTemplate,
      );
    }

    updatedModuleContent = fillMiddlewareNameIntoContent(
      updatedModuleContent,
      middlewareName,
    );

    await saveFile(middlewareDestinationFile, updatedModuleContent);
  } catch (error) {
    log.error(
      [CONTEXTS.generate, CONTEXTS.middleware],
      `Error generating middleware ${middlewareName}: ${error}`,
    );
  }
};
