import { input } from "@inquirer/prompts";

import { GenerateInitializationPreferences } from "../../../types";
import { yellow } from "../../../utils/chalk";
import {
  handleForceCloseIfAny,
  promptsUseTool,
  showUserAnswer,
} from "../../../utils/prompters";
import { generateInitialization } from "./generator";

export const promptGenerateInit = async () => {
  try {
    const projectName = await input({
      message: `What's the ${yellow("project name")}`,
      default: "my-project",
    });

    showUserAnswer("Project name", projectName);

    const initGit = await promptsUseTool("Git");
    showUserAnswer("Use Git?", initGit);
    const useGit = initGit === "y";

    let useHusky = true;

    if (useGit) {
      const huskyAnswer = await promptsUseTool("Husky");
      showUserAnswer("Use Husky?", huskyAnswer);
      useHusky = huskyAnswer === "y";
    }

    const useCommitlint = await promptsUseTool("Commitlint");
    showUserAnswer("Use Commitlint?", useCommitlint);

    const useSwagger = await promptsUseTool("Swagger");
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
