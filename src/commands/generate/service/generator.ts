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
  return getLibFileContent(TEMPLATES_PATH.serviceFunction.originalPath);
};

const fillServiceNameIntoContent = (content: string, serviceName: string) => {
  return replacePlaceholdersByValue(
    content,
    TEMPLATES_PLACEHOLDERS.functionName,
    serviceName,
  );
};

export const generateService = async (
  serviceFile: string,
  serviceName: string,
  useIndex: boolean,
) => {
  const cwdPath = process.cwd();

  const serviceDestinationDir = resolvePath(
    cwdPath,
    TEMPLATES_PATH.serviceFunction.destinationPath,
    serviceFile,
  );

  const serviceDestinationFile = resolvePath(
    serviceDestinationDir,
    useIndex ? "index.ts" : `${serviceFile}.ts`,
  );

  try {
    const functionTemplate = getFunctionTemplate();

    createDirectoryIfNotExists(serviceDestinationDir);

    const existingService = findExistingFile(serviceDestinationFile);

    let updatedModuleContent = existingService ?? "";

    updatedModuleContent = concatenateToContentBeforeExports(
      updatedModuleContent,
      functionTemplate,
    );
    updatedModuleContent = fillServiceNameIntoContent(
      updatedModuleContent,
      serviceName,
    );

    await saveFile(serviceDestinationFile, updatedModuleContent);
  } catch (error) {
    log.error(
      [CONTEXTS.generate, CONTEXTS.service],
      `Error generating service ${serviceName}: ${error}`,
    );
  }
};
