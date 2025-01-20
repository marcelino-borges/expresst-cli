import path from "path";
import { red } from "../utils/chalk";

export const GENERATE_PATH = path.resolve(
  __dirname,
  "../commands/generate/init/index.ts",
);

export const TEMPLATES_PATH = {
  serverEntry: {
    originalPath: path.resolve(
      __dirname,
      "../templates/server-entry/index.txt",
    ),
    destinationPath: "/src/index.ts",
  },
  packageJson: {
    originalPath: path.resolve(__dirname, "../templates/npm/packagejson.txt"),
    destinationPath: "/package.json",
  },
  commitlint: {
    originalPath: path.resolve(
      __dirname,
      "../templates/lint/commitlint.config.txt",
    ),
    destinationPath: "/commitlint.config.cjs",
  },
  swaggerLoader: {
    originalPath: path.resolve(__dirname, "../templates/swagger/loader.txt"),
    destinationPath: "/src/config/swagger/loader.ts",
  },
  swaggerYml: {
    originalPath: path.resolve(__dirname, "../templates/swagger/yml.txt"),
    destinationPath: "/src/config/swagger/doc.yml",
  },
  tsconfig: {
    originalPath: path.resolve(
      __dirname,
      "../templates/typescript/tsconfig.txt",
    ),
    destinationPath: "/tsconfig.json",
  },
  huskyPreCommit: {
    originalPath: path.resolve(__dirname, "../templates/husky/pre-commit.txt"),
    destinationPath: "/.husky/pre-commit",
  },
  huskyCommitMsg: {
    originalPath: path.resolve(__dirname, "../templates/husky/commit-msg.txt"),
    destinationPath: "/.husky/commit-msg",
  },
  gitIgnore: {
    originalPath: path.resolve(__dirname, "../templates/git/gitignore.txt"),
    destinationPath: "/.gitignore",
  },
};

export const TEMPLATES_PLACEHOLDERS = {
  projectName: "{{PROJECT_NAME}}",
};

export const LIB_PROMPT_NAME = red("rest-express-cli");
