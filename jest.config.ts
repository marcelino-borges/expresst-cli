import type { Config } from "jest";

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleDirectories: ["node_modules", "src"],
  runner: "jest-light-runner",
  setupFiles: ["source-map-support/register"],
};

export default config;
