import { TEMPLATES_PATH, TEMPLATES_PLACEHOLDERS } from "../../../constants";
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
import { CONTEXTS } from "../init/constants";

const getControllerFunctionTemplate = () => {
  return getLibFileContent(TEMPLATES_PATH.controllerFunction.originalPath);
};

const getWrapperTemplate = () => {
  return getLibFileContent(TEMPLATES_PATH.controllerWrapper.originalPath);
};

const fillControllerFunctionIntoWrapper = (
  content: string,
  functionTemplate: string,
) => {
  return replacePlaceholdersByValue(
    content,
    TEMPLATES_PLACEHOLDERS.controllerFunction,
    functionTemplate,
  );
};

const fillControllerNameIntoContent = (
  content: string,
  controllerName: string,
) => {
  return replacePlaceholdersByValue(
    content,
    TEMPLATES_PLACEHOLDERS.controllerName,
    controllerName,
  );
};

export const generateController = async (
  controllerFile: string,
  controllerName: string,
  useIndex: boolean,
) => {
  const cwdPath = process.cwd();

  const controllerDestinationDir = resolvePath(
    cwdPath,
    TEMPLATES_PATH.controllerWrapper.destinationPath,
    controllerFile,
  );

  const controllerDestinationFile = resolvePath(
    controllerDestinationDir,
    useIndex ? "index.ts" : `${controllerFile}.ts`,
  );

  try {
    const functionTemplate = getControllerFunctionTemplate();

    createDirectoryIfNotExists(controllerDestinationDir);

    const existingController = findExistingFile(controllerDestinationFile);

    let updatedModuleContent = existingController;

    if (existingController) {
      updatedModuleContent = concatenateToContent(
        existingController,
        functionTemplate,
      );
      updatedModuleContent = fillControllerNameIntoContent(
        updatedModuleContent,
        controllerName,
      );
    } else {
      updatedModuleContent = getWrapperTemplate();
      updatedModuleContent = fillControllerFunctionIntoWrapper(
        updatedModuleContent,
        functionTemplate,
      );
      updatedModuleContent = fillControllerNameIntoContent(
        updatedModuleContent,
        controllerName,
      );
    }

    await saveFile(controllerDestinationFile, updatedModuleContent);
  } catch (error) {
    log.error(
      [CONTEXTS.generate, CONTEXTS.controller],
      `Error generating controller ${controllerName}: ${error}`,
    );
  }
};
