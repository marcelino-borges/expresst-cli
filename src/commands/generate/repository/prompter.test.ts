import {
  handleForceCloseIfAny,
  promptDirOrFile,
  promptFunctionName,
  promptsUseIndexPattern,
} from "../../../utils/prompters";
import { generateRepository } from "./generator";
import { promptGenerateRepository } from "./prompter";

jest.mock("../../../utils/chalk", () => ({
  cyan: jest.fn((text) => text),
}));

jest.mock("../../../utils/prompters", () => ({
  handleForceCloseIfAny: jest.fn(),
  promptDirOrFile: jest.fn(),
  promptFunctionName: jest.fn(),
  promptsUseIndexPattern: jest.fn(),
}));

jest.mock("./generator", () => ({
  generateRepository: jest.fn(),
}));

describe("promptGenerateRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should log the generation message", async () => {
    console.log = jest.fn();

    await promptGenerateRepository();

    expect(console.log).toHaveBeenCalledWith("Generating an repository:");
  });

  it("should prompt for useIndex, function name, and directory or file", async () => {
    (promptsUseIndexPattern as jest.Mock).mockResolvedValue(true);
    (promptFunctionName as jest.Mock).mockResolvedValue("testFunction");
    (promptDirOrFile as jest.Mock).mockResolvedValue("testDirOrFile");

    await promptGenerateRepository();

    expect(promptsUseIndexPattern).toHaveBeenCalled();
    expect(promptFunctionName).toHaveBeenCalledWith("Repository");
    expect(promptDirOrFile).toHaveBeenCalledWith("Repository", true);
  });

  it("should call generateRepository with correct arguments", async () => {
    (promptsUseIndexPattern as jest.Mock).mockResolvedValue(true);
    (promptFunctionName as jest.Mock).mockResolvedValue("testFunction");
    (promptDirOrFile as jest.Mock).mockResolvedValue("testDirOrFile");

    await promptGenerateRepository();

    expect(generateRepository).toHaveBeenCalledWith(
      "testDirOrFile",
      "testFunction",
      true,
    );
  });

  it("should handle errors using handleForceCloseIfAny", async () => {
    const error = new Error("Test error");
    (promptsUseIndexPattern as jest.Mock).mockRejectedValue(error);

    await promptGenerateRepository();

    expect(handleForceCloseIfAny).toHaveBeenCalledWith(error);
  });
});
