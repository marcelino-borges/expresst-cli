#!/usr/bin/env node
import { select } from "@inquirer/prompts";
import { exec } from "child_process";
import { promisify } from "util";

export const asyncExec = promisify(exec);

export async function askVersion() {
  const question = {
    type: "list",
    name: "version",
    message: "Semantic Version?",
    choices: [
      {
        name: "Major",
        value: "major",
        description: "When you make incompatible API changes",
      },
      {
        name: "Minor",
        value: "minor",
        description:
          "When you add functionality in a backward compatible manner",
      },
      {
        name: "Patch",
        value: "patch",
        description: "When you make backward compatible bug fixes",
      },
    ],
  };

  const answer = await select(question);
  return answer;
}

(async () => {
  const version = await askVersion();
  await asyncExec(
    `npm version ${version} --no-git-tag-version && git add ./package*.json`,
  );
})();
