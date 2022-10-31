import { setupWorker } from "msw";
import { userHandlers } from "./userHandler";

export const worker = setupWorker(...userHandlers);
