import { setupServer } from "msw/node";
import { userHandlers } from "./userHandler";

export const server = setupServer(...userHandlers);
