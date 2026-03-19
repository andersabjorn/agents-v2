import { tools } from "./tools/index.ts";

export const executeTool = async (name: string, args: any) => {
    const tool = tools[name as any];
    
    if (!tool) {
        return 'Unknown tool, this does not exists'
    }
    
    const execute = tool.excute;
    
    if (!execute) {
        return 'This is not a registed tool';
    }
    
    const result = await execute (args, {
        tolCallId: '',
        messages:[],
    })
};