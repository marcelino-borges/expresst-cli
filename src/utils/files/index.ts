import fs from "fs";
import path from "path";
import prettier from "prettier";

/**
 * Tries to find a file content in the file system by a given `filePath`.
 *
 * Differs from the util `getLibFileContent` because this function does not throw an
 * error if the file does not exist. In this case, it returns `null`.
 *
 * @param filePath Path of the file to find.
 * @returns File content as `string` if file exists or null if file does not exist.
 */
export const findExistingFile = (filePath: string) => {
  try {
    return fs.readFileSync(filePath)?.toString();
  } catch (error) {
    return null;
  }
};

/**
 * Retrieves a file content from the file system by a given `templateFilePath`.
 *
 * Differs from the util `findExistingFile` because this function throws an error
 * if the file does not exist.
 *
 * @param libFilePath Path of the file to retrieve its content.
 * @returns File content as `string`.
 */
export const getLibFileContent = (libFilePath: string) => {
  return fs.readFileSync(libFilePath)?.toString();
};

/**
 * Resolves which Prettier configuration file to use. If it finds any `.prettierrc`
 * file in `process.cwd` (project root where the user is running the lib from),
 * it uses it. Otherwise, it uses the one file from the lib.
 *
 * @returns The path of the prettier configuration file.
 */
export const getPrettierPath = () => {
  const cwdPath = process.cwd();
  const userPrettierPath = path.resolve(cwdPath, ".prettierrc");
  const userHasPrettierAtRoot = fs.existsSync(userPrettierPath);

  if (!userHasPrettierAtRoot) {
    const libPrettierPath = resolvePath(cwdPath, "./.prettierrc");

    return libPrettierPath;
  }

  return userPrettierPath;
};

/**
 * Formats a file content using Prettier.
 * If it finds any `.prettierrc`
 * file in `process.cwd` (project root where the user is running the lib from),
 * it uses it. Otherwise, it uses the one file from the lib.
 *
 * @param content Content of the file to be formatted as `string`.
 * @param filePath Path of the file used to infer the parser.
 * @returns Formatted `string` with the content of the file.
 */
export const formatFileContent = async (content: string, filePath: string) => {
  const prettierConfigPath = getPrettierPath();

  const prettierConfig = await prettier.resolveConfig(prettierConfigPath);

  const formattedContent = await prettier.format(content, {
    ...(prettierConfig ?? {}),
    filepath: filePath,
  });

  return formattedContent;
};

/**
 * Writes a file to the file system.
 *
 * @param filePath Path where to file will to be written.
 * @param rawContent Raw content as `string` of the file to be saved.
 */
export const saveFile = async (filePath: string, rawContent: string) => {
  const formattedContent = await formatFileContent(rawContent, filePath);
  fs.writeFileSync(filePath, formattedContent);
};

/**
 * Finds a placeholder in a given content and replaces it by the given `value` as many
 * times as the placeholder is located in the content.
 *
 * @param rawContent String content to look for the placeholder.
 * @param placeholder Placeholder used to be replaced.
 * @param value Value to replace the placeholder.
 * @returns Content after replacements.
 */
export const replacePlaceholdersByValue = (
  rawContent: string,
  placeholder: string,
  value: string,
) => {
  return rawContent.replace(new RegExp(placeholder, "g"), value);
};

/**
 * Makes sure a directory exists in the file system. If it does not exist, it creates it.
 *
 * @param directoryPath The target directory path.
 */
export const createDirectoryIfNotExists = (directoryPath: string) => {
  const directoryExists = fs.existsSync(directoryPath);

  if (!directoryExists) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
};

/**
 * Concatenates a new content to the end of an existing content.
 * Two new lines are added between the existing content and the new content.
 *
 * @param existingContent Content `string` used to concatenate the new content.
 * @param newContent String that will be concatenated to the end of the existing content.
 * @returns Updated content string after concatenation.
 */
export const concatenateToContent = (
  existingContent: string,
  newContent: string,
) => {
  return `${existingContent.trim()}\n\n${newContent}`;
};

/**
 * Resolves the absolute path based on the arguments passed.
 * Uses the `path.resolve` method to resolve the path.
 *
 * @param paths List of paths to resolve.
 * @returns The resolved path.
 */
export const resolvePath = (...paths: string[]) => {
  return path.resolve(...paths);
};
