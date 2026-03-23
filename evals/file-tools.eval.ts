import {evaluate} from "@lmnr-ai/lmnr";
import {toolSelectionScore} from './evaluators.ts'

import type {EvalData, EvalTarget} from './types.ts'
import dataset from './data/file-tools.json' with {type: "json"};
import {singelTurnExecutorWithMocks} from './executors.ts'

const  executor = async (data: EvalData) => {
    return singelTurnExecutorWithMocks(data);
};

evaluate({
    data: dataset as any,
    executor,
    evaluators: {
        selectionScore: (output: any, target: any) => {
            if (target === 'secondary') return 1;
            
            return toolSelectionScore(output, target);
        },
    },
    groupName: "file-tool-selection",
});