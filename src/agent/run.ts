import "dotenv/config";
import { generateText, type ModelMessage } from "ai";
import { openai } from "@ai-sdk/openai";

import { tools } from "./tools/index.ts";
import { SYSTEM_PROMPT } from "./system/prompt.ts";

import type { AgentCallbacks } from "../types.ts";

const MODEL_NAME = "gpt-4o-mini";

export async function runAgent(
    userMessage: string,
    conversationHistory: ModelMessage[],
    callbacks: AgentCallbacks,
): Promise<any> {
    // Filter and check if we need to compact the conversation history before starting
    const { text, toolCalls, toolResults } = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        system: SYSTEM_PROMPT,
        tools,
        maxSteps: 5,
    });

    console.log("Text:", text);
    console.log("Tool calls:", toolCalls);
    console.log("Tool results:", toolResults);
};

runAgent("What is the current time right now?");
