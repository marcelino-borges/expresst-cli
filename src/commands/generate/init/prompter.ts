import { input } from "@inquirer/prompts";
import { yellow } from "../../../utils/chalk";
import {
  handleForceCloseIfAny,
  showUserAnswer,
} from "../../../utils/prompters";
import { GenerateInitializationPreferences } from "../../../types";
import { generateInitialization } from ".";

const askUseTool = async (tool: string) => {
  return await input({
    message: `Use ${yellow(tool)} (y/n):`,
    default: "y",
  });
};

const getUserPreferences = async () => {
  try {
    const projectName = await input({
      message: `What's the ${yellow("project name")}`,
      default: "my-project",
    });

    showUserAnswer("Project name", projectName);

    const initGit = await askUseTool("Git");
    showUserAnswer("Use Git?", initGit);
    const useGit = initGit === "y";

    let useHusky = true;

    if (useGit) {
      const huskyAnswer = await askUseTool("Husky");
      showUserAnswer("Use Husky?", huskyAnswer);
      useHusky = huskyAnswer === "y";
    }

    const useCommitlint = await askUseTool("Commitlint");
    showUserAnswer("Use Commitlint?", useCommitlint);

    const useSwagger = await askUseTool("Swagger");
    showUserAnswer("Use Swagger?", useSwagger);

    const prefs: GenerateInitializationPreferences = {
      projectName,
      git: useGit,
      husky: useHusky,
      commitlint: useCommitlint === "y",
      swagger: useSwagger === "y",
    };

    generateInitialization(prefs);
  } catch (error) {
    handleForceCloseIfAny(error);
  }
};

getUserPreferences();
