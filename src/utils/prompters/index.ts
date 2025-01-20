import { gray } from "../chalk";

export const handleForceCloseIfAny = (error: any) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("👋 Cancelled, see you next time!");
  } else {
    throw error;
  }
};

export const showUserAnswer = (question: string, answer: string) => {
  console.info(`${gray(question)} ${answer}\n`);
};
