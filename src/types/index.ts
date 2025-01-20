export interface CommandInfo {
  command: string;
  alias: string;
  description: string;
}

export interface GenerateInitializationPreferences {
  /**
   * The name of the project
   * to be used in package.json.
   */
  projectName: string;

  /**
   * Whether `Git` should be initialized
   * in the project.
   *
   * If Git is disabled, `Husky` won't be used
   */
  git: boolean;

  /**
   * Whether `Husky` should be used.
   *
   * `Pre-commit` hook is created by default.
   *
   * `Commit-msg` hook is created if the `commitlint` option is enabled.
   */
  husky: boolean;

  /**
   * Whether `Commitlint` should be used.
   *
   * Commitlint rules are enforced by `Husky`'s `commit-msg` hook.
   *
   * Everytime a commit is made, the message is validated against the rules setup for the created `commitlint.config.cjs`.
   */
  commitlint: boolean;

  /**
   * Whether `Swagger` should be used.
   *
   * Swagger is a tool that helps you document your API.
   * If `true` is set, 2 files are going to be created:
   *
   * - `loader.ts` - A file that loads the `doc.yml` file as a route in your API.
   * - `doc.yml` - A file that contains the documentation of your API.
   */
  swagger: boolean;
}
