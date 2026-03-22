import { generateText, stepCountIs, tool, type ToolSet }from "ai";
import {openai} from "@ai-sdk/openai";
import {z} from "zod";

import type {
  EvalData,
  SingleTurnResult,
  MultiTurnEvalData,
  MultiTurnResult,
} from "./types.ts";

const TOOL_DEFINITIONS = {
  readFile: {
    description: "Read the content of a file at the specified path",
    parameters: z.object({
      path: z.string().describe('the path to the file you want to read'),
    ){
}
  },
  writefile: {},
  listFiles: {},
  deleteFile: {},
  runCommand: {},
}