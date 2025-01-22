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

const getRouterImplementationTemplate = () => {
  return getLibFileContent(TEMPLATES_PATH.routerImplementation.originalPath);
};

const getRouterWrapperTemplate = () => {
  return getLibFileContent(TEMPLATES_PATH.routerWrapper.originalPath);
};

const fillRouterImplementationIntoContent = (
  content: string,
  implementationTemplate: string,
) => {
  return replacePlaceholdersByValue(
    content,
    TEMPLATES_PLACEHOLDERS.routeImplementation,
    implementationTemplate,
  );
};

const fillRouterMethodIntoContent = (content: string, routeMethod: string) => {
  return replacePlaceholdersByValue(
    content,
    TEMPLATES_PLACEHOLDERS.routeMethod,
    routeMethod,
  );
};

const fillRouterPathIntoContent = (content: string, routePath: string) => {
  return replacePlaceholdersByValue(
    content,
    TEMPLATES_PLACEHOLDERS.routePath,
    routePath,
  );
};

export const generateRouter = async (
  routerFile: string,
  routerMethod: string,
  routerPath: string,
  useIndex: boolean,
) => {
  const cwdPath = process.cwd();

  const routerDestinationDir = resolvePath(
    cwdPath,
    TEMPLATES_PATH.routerWrapper.destinationPath,
    routerFile,
  );

  const routerDestinationFile = resolvePath(
    routerDestinationDir,
    useIndex ? "index.ts" : `${routerFile}.ts`,
  );

  try {
    const implementationTemplate = getRouterImplementationTemplate();

    createDirectoryIfNotExists(routerDestinationDir);

    const existingRouter = findExistingFile(routerDestinationFile);

    let updatedModuleContent = existingRouter ?? "";

    if (existingRouter) {
      updatedModuleContent = concatenateToContentBeforeExports(
        updatedModuleContent,
        implementationTemplate,
      );
    } else {
      updatedModuleContent = getRouterWrapperTemplate();
      updatedModuleContent = fillRouterImplementationIntoContent(
        updatedModuleContent,
        implementationTemplate,
      );
    }

    updatedModuleContent = fillRouterMethodIntoContent(
      updatedModuleContent,
      routerMethod,
    );
    updatedModuleContent = fillRouterPathIntoContent(
      updatedModuleContent,
      routerPath,
    );

    await saveFile(routerDestinationFile, updatedModuleContent);
  } catch (error) {
    log.error(
      [CONTEXTS.generate, CONTEXTS.useCase],
      `Error generating router [${routerMethod}] /${routerPath}: ${error}`,
    );
  }
};
