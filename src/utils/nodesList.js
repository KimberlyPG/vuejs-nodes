import { readonly } from 'vue'

export const nodesList = readonly([
    {
        name: "Number",
        item: "number",
        input: 0,
        output: 1,
    },
    {
        name: "Addition",
        item: "addition",
        input: 2,
        output: 1,
    },
    {
        name: "Subtraction",
        item: "subtraction",
        input: 2,
        output: 1,
    },
    {
        name: "Multiplication",
        item: "multiplication",
        input: 2,
        output: 1,
    },
    {
        name: "Division",
        item: "division",
        input: 2,
        output: 1,
    },
    {
        name: "Assign",
        item: "assign",
        input: 1,
        output: 0
    },
    {
        name: "If-else",
        item: "if",
        input: 0,
        output: 1
    },
    {
        name: "For",
        item: "for",
        input: 0,
        output: 1
    },
    {
        name: "Condition result",
        item: "nodeCondition",
        input: 1,
        output: 0
    },
]);