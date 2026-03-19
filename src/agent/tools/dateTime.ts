import { tool } from 'ai';
import { z } from 'zod';

export const dateTime = tool({
    description: "Returns the current time and date. Use this tool before any time related task",
    inputSchema: z.object({
        location: z.string().optional().describe("Optional timezone"),
    }),
    execute: async ({ location }) => ({
        time: new Date().toISOString(),
        location: location ?? "UTC",
    }),
});