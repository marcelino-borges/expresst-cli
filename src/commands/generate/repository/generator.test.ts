import {
  CONTEXTS,
  TEMPLATES_PATH,
  TEMPLATES_PLACEHOLDERS,
} from "../../../constants";
import { red } from "../../../utils/chalk";
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
import { generateRepository, repositoryGeneratorTests } from "./generator";

jest.mock("../../../utils/files", () => ({
  concatenateToContentBeforeExports: jest.fn(),
  createDirectoryIfNotExists: jest.fn(),
  findExistingFile: jest.fn(),
  getLibFileContent: jest.fn(),
  replacePlaceholdersByValue: jest.fn(),
  resolvePath: jest.fn(),
  saveFile: jest.fn(),
}));

jest.mock("../../../utils/chalk", () => ({
  yellow: jest.fn().mockImplementation((text) => text),
  yellowBright: jest.fn().mockImplementation((text) => text),
  red: jest.fn().mockImplementation((text) => text),
  blue: jest.fn().mockImplementation((text) => text),
  cyan: jest.fn().mockImplementation((text) => text),
  gray: jest.fn().mockImplementation((text) => text),
  green: jest.fn().mockImplementation((text) => text),
}));

jest.mock("../../../utils/logs", () => ({
  log: {
    error: jest.fn(),
  },
}));

describe("Repository Generator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getFunctionTemplate", () => {
    it("should return the function template content", () => {
      const mockContent = "function template content";
      (getLibFileContent as jest.Mock).mockReturnValue(mockContent);

      const result = repositoryGeneratorTests.getFunctionTemplate();

      expect(getLibFileContent).toHaveBeenCalledWith(
        TEMPLATES_PATH.repositoryFunction.originalPath,
      );
      expect(result).toBe(mockContent);
    });
  });

  describe("fillRepositoryNameIntoContent", () => {
    it("should replace placeholders with the repository name", () => {
      const content = "function {{functionName}}() {}";
      const repositoryName = "testRepository";
      const expectedContent = "function testRepository() {}";

      (replacePlaceholdersByValue as jest.Mock).mockReturnValue(
        expectedContent,
      );

      const result = repositoryGeneratorTests.fillRepositoryNameIntoContent(
        content,
        repositoryName,
      );

      expect(replacePlaceholdersByValue).toHaveBeenCalledWith(
        content,
        TEMPLATES_PLACEHOLDERS.functionName,
        repositoryName,
      );
      expect(result).toBe(expectedContent);
    });
  });

  describe("generateRepository", () => {
    const cwdPath = process.cwd();
    const repositoryFile = "testRepository";
    const repositoryName = "testRepository";
    const useIndex = true;
    const repositoryDestinationDir = "resolved/path/to/repository";
    const repositoryDestinationFile = "resolved/path/to/repository/index.ts";
    const functionTemplate = "function template content";
    const existingUseCase = "existing use case content";
    const updatedModuleContent = "updated module content";

    beforeEach(() => {
      (resolvePath as jest.Mock)
        .mockReturnValueOnce(repositoryDestinationDir)
        .mockReturnValueOnce(repositoryDestinationFile);
      (findExistingFile as jest.Mock).mockReturnValue(existingUseCase);
      (concatenateToContentBeforeExports as jest.Mock).mockReturnValue(
        updatedModuleContent,
      );
      jest
        .spyOn(repositoryGeneratorTests, "fillRepositoryNameIntoContent")
        .mockReturnValue(updatedModuleContent);
    });

    afterEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it("should generate the repository file with correct content", async () => {
      (getLibFileContent as jest.Mock).mockReturnValue(functionTemplate);
      (replacePlaceholdersByValue as jest.Mock).mockReturnValue(
        updatedModuleContent,
      );

      await generateRepository(repositoryFile, repositoryName, useIndex);

      expect(resolvePath).toHaveBeenCalledWith(
        cwdPath,
        TEMPLATES_PATH.repositoryFunction.destinationPath,
        repositoryFile,
      );
      expect(resolvePath).toHaveBeenCalledWith(
        repositoryDestinationDir,
        "index.ts",
      );
      expect(getLibFileContent).toHaveBeenCalled();
      expect(createDirectoryIfNotExists).toHaveBeenCalledWith(
        repositoryDestinationDir,
      );
      expect(findExistingFile).toHaveBeenCalledWith(repositoryDestinationFile);
      expect(concatenateToContentBeforeExports).toHaveBeenCalledWith(
        existingUseCase,
        functionTemplate,
      );
      expect(replacePlaceholdersByValue).toHaveBeenCalledWith(
        updatedModuleContent,
        TEMPLATES_PLACEHOLDERS.functionName,
        repositoryName,
      );
      expect(saveFile).toHaveBeenCalledWith(
        repositoryDestinationFile,
        updatedModuleContent,
      );
    });

    it("should log an error if an exception occurs", async () => {
      const error = new Error("Test error");

      (getLibFileContent as jest.Mock).mockImplementation(() => {
        throw error;
      });
      jest.spyOn(log, "error");

      await generateRepository(repositoryFile, repositoryName, useIndex);

      expect(log.error).toHaveBeenCalledWith(
        [CONTEXTS.generate, CONTEXTS.repository],
        `Error generating repository ${repositoryName}: ${error}`,
      );
    });
  });
});
