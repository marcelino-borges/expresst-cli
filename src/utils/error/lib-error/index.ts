export class LibError extends Error {
  public readonly cause: unknown;

  constructor(message: string, cause?: any) {
    super(message);
    this.cause = cause;
    this.name = "LibError";
    this.cause = cause;

    console.log(this.toString());
  }

  public toString() {
    return `⛔ [${this.name}] | Displayable message: ${this.message} | Cause: ${this.cause}`;
  }

  public getCause() {
    return this.cause;
  }

  public getName() {
    return this.name;
  }
}
