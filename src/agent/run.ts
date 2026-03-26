import "dotenv/config";
import { generateText, type ModelMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { getTracer, Laminar } from '@lmnr-ai/lmnr'
import { tools } from "./tools/index.ts";
import { SYSTEM_PROMPT } from "./system/prompt.ts";

import type { AgentCallbacks } from "../types.ts";

const MODEL_NAME = "gpt-4o";

Laminar.initialize({
    projectApiKey: process.env.LMNR_PROJECT_API_KEY,
})
export async function runAgent(
    userMessage: string,
    conversationHistory: ModelMessage[],
    callbacks: AgentCallbacks,
): Promise<any> {
    // Filter and check if we need to compact the conversation history before starting
    const { text } = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        system: SYSTEM_PROMPT,
        tools,
        experimental_telemetry: {
            isEnabled: true,
            tracer: getTracer(),
        },
        
    });

//Evaluating the code and try to get a higer score
    // Practise on evaluation trying to make 
    // tring to evaluate and make progressg
await Laminar.flush();

console.log("done");

}
