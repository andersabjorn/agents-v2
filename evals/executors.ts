import { generateText, stepCountIs, tool, type ToolSet }from "ai";
import {openai} from "@ai-sdk/openai";
import {z} from "zod";

import type {
  EvalData,
  SingleTurnResult,
  MultiTurnEvalData,
  MultiTurnResult,
} from "./types.ts";
import {buildMessages} from "./utils.ts";

const TOOL_DEFINITIONS: any = {
  readFile: {
    description: "Read the content of a file at the specified path",
    parameters: z.object({
      path: z.string().describe('the path to the file you want to read'),
    }),

  },
  writeFile: {
    description: "Write given content to the file at the given path",
    parameters: z.object({
      path: z.string().describe('the path to the file you want to write to'),
      content: z.string().describe("the content you want to write to the file")
    }),
  },
    listFiles: {
      description: "List the all the files in  a directory",
      parameters: z.object({
        path: z.string().describe('the path the directory in which  you want to list the files'),
      }),
    },
    deleteFile: {
      description: "Delete a file at the given path",
      parameters: z.object({
        path: z.string().describe('the path to the file that you want to delete'),
      }),
    },
    runCommand: {
      description: "execute a shell command and return its output",
      parameters: z.object({
        command: z.string().describe('the shell command to execute'),
      }),
    },
  };

export const singelTurnExecuter = async (data: EvalData) => {
  const messages = buildMessages(data);
  
  const tools : ToolSet = {};
  for (const toolName of data.tools){
    const def = TOOL_DEFINITIONS[toolName]
    
    if (def) {
      tools[toolName]= tool({
        description: def.description,
        inputSchema: def.parameters,
      });
    }
  }
  const {toolCalls} = await generateText({
    model: openai(data.config?.model ?? "gpt-4o-mini"),
    messages,
    tools,
    stopWhen: stepCountIs(1),
    temperature: data.config?.temperature ?? undefined,
    
  });
  
  const calls = toolCalls.map(tc => ({
    toolName: tc.toolName,
    args: 'args' in tc ? tc.args : {},
  }));
  
  const toolNames = toolCalls.map((tc) => tc.toolName);
  
  return {
    toolCalls,
    toolNames,
    selectedAny: toolNames.length > 0,
  };
};