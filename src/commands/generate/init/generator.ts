import fs from "fs";
import { spawn } from "child_process";

import { TEMPLATES_PATH, TEMPLATES_PLACEHOLDERS } from "../../../constants";
import { yellow } from "../../../utils/chalk";
import { log } from "../../../utils/logs";
import { GenerateInitializationPreferences } from "../../../types";
import { CONTEXTS } from "./constants";

const PROD_DEPENDENCIES = [
  "express",
  "dotenv",
  "cors",
  "helmet",
  "swagger-ui-express",
  "yaml",
];

const DEV_DEPENDENCIES = [
  "prettier",
  "commitlint",
  "@commitlint/config-conventional",
  "@types/express",
  "@types/node",
  "@types/cors",
  "@types/swagger-ui-express",
  "eslint",
  "husky",
  "tsconfig-paths",
  "typescript",
  "ts-node",
  "tsconfig-paths",
  "tsconfig-paths-webpack-plugin",
  "webpack",
  "webpack-cli",
  "webpack-node-externals",
  "nodemon",
];

const makeSurePackageJsonExists = (cwdPath: string, projectName: string) => {
  const destination = `${cwdPath}${TEMPLATES_PATH.packageJson.destinationPath}`;

  let pkgJson = fs
    .readFileSync(TEMPLATES_PATH.packageJson.originalPath)
    .toString()
    .replace(TEMPLATES_PLACEHOLDERS.projectName, projectName);

  const pkgJsonExists = fs.existsSync(destination);

  if (!pkgJsonExists) {
    log.info(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.npmInit],
      `${yellow(TEMPLATES_PATH.packageJson.destinationPath)} not detected! Initializing ${yellow(TEMPLATES_PATH.packageJson.destinationPath)} and proceding with dependencies installation...`,
    );
    fs.writeFileSync(destination, pkgJson);
    return;
  }

  log.info(
    [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.npmInit],
    `${yellow(TEMPLATES_PATH.packageJson.destinationPath)} detected! Proceding with dependencies installation..`,
  );
};

const setupCommitLint = (cwdPath: string) => {
  const destination = `${cwdPath}${TEMPLATES_PATH.commitlint.destinationPath}`;

  let commitlintConfig = fs
    .readFileSync(TEMPLATES_PATH.commitlint.originalPath)
    .toString();

  fs.writeFileSync(destination, commitlintConfig);

  log.success(
    [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.commitLint],
    `Commitlint created at ${yellow(destination)}.`,
  );
};

const setupSwagger = (cwdPath: string) => {
  const configFolderExists = fs.existsSync(`${cwdPath}/src/config/swagger`);

  if (!configFolderExists)
    fs.mkdirSync(`${cwdPath}/src/config/swagger`, { recursive: true });

  const loaderDestination = `${cwdPath}${TEMPLATES_PATH.swaggerLoader.destinationPath}`;
  let swaggerLoaderTemplate = fs
    .readFileSync(TEMPLATES_PATH.swaggerLoader.originalPath)
    .toString();

  fs.writeFileSync(loaderDestination, swaggerLoaderTemplate);

  const ymlDestination = `${cwdPath}${TEMPLATES_PATH.swaggerYml.destinationPath}`;
  let swaggerYmlTemplate = fs
    .readFileSync(TEMPLATES_PATH.swaggerYml.originalPath)
    .toString();

  fs.writeFileSync(ymlDestination, swaggerYmlTemplate);

  log.success(
    [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.swagger],
    `Swagger loader created at ${yellow(loaderDestination)}.`,
  );

  log.success(
    [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.swagger],
    `Swagger yaml created at ${yellow(ymlDestination)}.`,
  );
};

const setupTypescript = (cwdPath: string) => {
  let tsconfigTemplate = fs
    .readFileSync(TEMPLATES_PATH.tsconfig.originalPath)
    .toString();

  const tsconfigDestination = `${cwdPath}${TEMPLATES_PATH.tsconfig.destinationPath}`;

  fs.writeFileSync(tsconfigDestination, tsconfigTemplate);

  log.success(
    [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.tsconfig],
    `${yellow("tsconfig.json")} created at ${yellow(tsconfigDestination)}.`,
  );
};

const runHuskyPrepare = () => {
  const funcLogInfo = (message: string) =>
    log.info([CONTEXTS.generate, CONTEXTS.init, CONTEXTS.husky], message);

  funcLogInfo(`Running ${yellow("npm prepare")}...`);

  const install = spawn("npm", ["run", "prepare"], {
    shell: true,
    cwd: process.cwd(),
  });

  install.stdout.on("data", (data: any) => {
    funcLogInfo(data);
  });

  install.stderr.on("data", (data: any) => {
    log.error([CONTEXTS.generate, CONTEXTS.init, CONTEXTS.husky], data);
  });

  install.on("close", (code: any) => {
    log.success(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.husky],
      `NPM PREPARE finished [${code}]`,
    );
  });
};

const createGitIgnore = (cwdPath: string) => {
  let gitIgnoreTemplate = fs
    .readFileSync(TEMPLATES_PATH.gitIgnore.originalPath)
    .toString();

  const gitIgnoreDestination = `${cwdPath}${TEMPLATES_PATH.gitIgnore.destinationPath}`;

  fs.writeFileSync(gitIgnoreDestination, gitIgnoreTemplate);

  log.success(
    [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.tsconfig],
    `${yellow(".gitignore")} created at ${yellow(gitIgnoreDestination)}.`,
  );
};

const setupGit = (cwdPath: string) => {
  createGitIgnore(cwdPath);

  const gitFolderExists = fs.existsSync(`${cwdPath}/.git`);

  if (gitFolderExists) {
    log.info(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.git],
      `Git folder detected at ${yellow(cwdPath)}. No need to initialize GIT.`,
    );
  }

  const install = spawn("git", ["init"], {
    shell: true,
    cwd: process.cwd(),
  });

  install.stdout.on("data", (data: any) => {
    log.info([CONTEXTS.generate, CONTEXTS.init, CONTEXTS.git], data);
  });

  install.stderr.on("data", (data: any) => {
    log.error([CONTEXTS.generate, CONTEXTS.init, CONTEXTS.git], data);
  });

  install.on("close", (code: any) => {
    log.success(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.git],
      `Git repository initiated in the project [${code}]`,
    );
  });
};

const setupHusky = (cwdPath: string, useCommitMsgHook: boolean) => {
  const huskyFolderExists = fs.existsSync(`${cwdPath}/.husky`);

  if (!huskyFolderExists)
    fs.mkdirSync(`${cwdPath}/.husky`, { recursive: true });

  let preCommitTemplate = fs
    .readFileSync(TEMPLATES_PATH.huskyPreCommit.originalPath)
    .toString();

  const preCommitDestination = `${cwdPath}${TEMPLATES_PATH.huskyPreCommit.destinationPath}`;

  fs.writeFileSync(preCommitDestination, preCommitTemplate);

  log.success(
    [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.husky],
    `Husky pre-commit hook created at ${yellow(preCommitDestination)}.`,
  );

  if (useCommitMsgHook) {
    let commitMsgTemplate = fs
      .readFileSync(TEMPLATES_PATH.huskyCommitMsg.originalPath)
      .toString();

    const commitMsgDestination = `${cwdPath}${TEMPLATES_PATH.huskyCommitMsg.destinationPath}`;

    fs.writeFileSync(commitMsgDestination, commitMsgTemplate);

    log.success(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.husky],
      `Husky commit-msg hook created at ${yellow(commitMsgDestination)}.`,
    );
  }
};

const intallProdDependencies = (
  onComplete: () => void,
  onError: (error: any) => void,
) => {
  const funcLogInfo = (message: string) =>
    log.info(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.prodDependencies],
      message,
    );

  funcLogInfo("Starting production dependencies installation...");

  const install = spawn("npm", ["install", ...PROD_DEPENDENCIES], {
    shell: true,
    cwd: process.cwd(),
  });

  install.stdout.on("data", (data: any) => {
    funcLogInfo(data);
  });

  install.stderr.on("data", (data: any) => {
    log.error(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.prodDependencies],
      data,
    );

    onError(data);
  });

  install.on("close", (code: any) => {
    log.success(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.prodDependencies],
      `Production dependencies installation finished [${code}]`,
    );

    onComplete();
  });
};

const intallDevDependencies = (
  onComplete: () => void,
  onError: (error: any) => void,
) => {
  const funcLogInfo = (message: string) =>
    log.info(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.devDependencies],
      message,
    );

  funcLogInfo("Starting dev dependencies installation...");

  const install = spawn("npm", ["install", "--save-dev", ...DEV_DEPENDENCIES], {
    shell: true,
    cwd: process.cwd(),
  });

  install.stdout.on("data", (data: any) => {
    funcLogInfo(data);
  });

  install.stderr.on("data", (data: any) => {
    log.error(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.devDependencies],
      data,
    );
    onError(data);
  });

  install.on("close", (code: any) => {
    log.success(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.prodDependencies],
      `Dev dependencies installation finished [${code}]`,
    );

    onComplete();
  });
};

const createFiles = (cwdPath: string) => {
  const creationPath = `${cwdPath}/src`;

  try {
    let template = fs
      .readFileSync(TEMPLATES_PATH.serverEntry.originalPath)
      .toString();
    fs.mkdirSync(creationPath, { recursive: true });
    fs.writeFileSync(
      `${cwdPath}${TEMPLATES_PATH.serverEntry.destinationPath}`,
      template,
    );
  } catch (error: any) {
    throw new Error("Error creating server entry file: " + error);
  }
};

export const generateInitialization = (
  prefs: GenerateInitializationPreferences,
) => {
  const cwdPath = process.cwd();

  try {
    makeSurePackageJsonExists(cwdPath, prefs.projectName);
  } catch (error: any) {
    log.error(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.npmInit],
      `\nError creating ${yellow("package.json")}: ${error}`,
    );
    return;
  }

  if (prefs.git) {
    try {
      setupGit(cwdPath);
    } catch (error: any) {
      log.error(
        [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.git],
        `\nError initializing GIT for the project: ${error}`,
      );
      return;
    }
  }

  if (prefs.husky) {
    try {
      setupHusky(cwdPath, prefs.commitlint);
    } catch (error: any) {
      log.error(
        [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.husky],
        `\nError setting up ${yellow("husky")}: ${error}`,
      );
      return;
    }
  }

  try {
    setupCommitLint(cwdPath);
  } catch (error: any) {
    log.error(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.commitLint],
      `\nError creating ${yellow("commitlint.config.cjs")}: ${error}`,
    );
    return;
  }

  try {
    setupSwagger(cwdPath);
  } catch (error: any) {
    log.error(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.swagger],
      `\nError setting up ${yellow("swagger")}: ${error}`,
    );
    return;
  }

  try {
    setupTypescript(cwdPath);
  } catch (error: any) {
    log.error(
      [CONTEXTS.generate, CONTEXTS.init, CONTEXTS.tsconfig],
      `\nError setting up ${yellow("typescript")}: ${error}`,
    );
    return;
  }

  intallProdDependencies(
    () =>
      intallDevDependencies(
        () => {
          runHuskyPrepare();

          createFiles(cwdPath);
        },
        () => console.error("\nError installing dev dependencies"),
      ),
    () => console.error("\nError installing production dependencies"),
  );
};
