// // import storage from './storage'

// export function javascriptToPython(editor) {
//     // const exportdata = editor.value.export();
//     const dataNodes = editor.drawflow.Home.data;

//     let num1 = null;
//     let num2 = null;
//     let total;
//     let assignName = '';
//     let pythonCode = '';
//     let pythonCodePrint = '';

//     Object.entries(dataNodes).forEach(([, value]) => {
//         if (value.name === "number") {
//             if (num1 == null && value.outputs.output_1.connections.length === 1) {
//                 num1 = value.data.number;
//             }
//             else if (num1 != null && value.outputs.output_1.connections.length === 1) {
//                 num2 = value.data.number;
//             }
//         }
                     
//         if (value.name === "addition") {
//             total = value.data.result;
//             if(value.outputs.output_1.connections.length > 0) {
//             const output = value.outputs.output_1.connections[0].node
//             const nodeAssignData = editor.value.getNodeFromId(output)
//             assignName = nodeAssignData.data.variable
//             }
//             pythonCode = {
//                 num1: `num1 = ${num1 == null ? 0 : num1}`,
//                 num2: `num2 = ${num2 == null ? 0 : num2}`,
//                 operation: "# addition = num1 + num2",
//                 variable: `${assignName === undefined || assignName === "" ? "add" : assignName} = ${total}`
//             }
//         }
//         if (value.name === "subtraction") {
//             total = value.data.result;
//             if(value.outputs.output_1.connections.length > 0) {
//             const output = value.outputs.output_1.connections[0].node
//             const nodeAssignData = editor.value.getNodeFromId(output)
//             assignName = nodeAssignData.data.variable
//             }
//             // assignName = value.data.variable
//             pythonCode = {
//                 num1: `num1 = ${num1 == null ? 0 : num1}`,
//                 num2: `num2 = ${num2 == null ? 0 : num2}`,
//                 operation: "# subtraction = num1 - num2",
//                 variable: `${assignName === undefined || assignName === "" ? "sub" : assignName} = ${total}`
//             }
//         }
//         if (value.name === "multiplication") {
//             total = value.data.result;
//             if(value.outputs.output_1.connections.length > 0) {
//             const output = value.outputs.output_1.connections[0].node
//             const nodeAssignData = editor.value.getNodeFromId(output)
//             assignName = nodeAssignData.data.variable
//             }
//             // assignName = value.data.variable
//             pythonCode = {
//                 num1: `num1 = ${num1 == null ? 0 : num1}`,
//                 num2: `num2 = ${num2 == null ? 0 : num2}`,
//                 operation: "# multiplication = num1 * num2",
//                 variable: `${assignName === undefined || assignName === "" ? "multiplication" : assignName} = ${total}`
//             }
//         }
//         if (value.name === "division") {
//             total = value.data.result;
//             if(value.outputs.output_1.connections.length > 0) {
//             const output = value.outputs.output_1.connections[0].node
//             const nodeAssignData = editor.value.getNodeFromId(output)
//             assignName = nodeAssignData.data.variable
//             }
//             // assignName = value.data.variable
//             pythonCode = {
//                 num1: `num1 = ${num1 == null ? 0 : num1}`,
//                 num2: `num2 = ${num2 == null ? 0 : num2}`,
//                 operation: "# division = num1 / num2",
//                 variable: `${assignName === undefined || assignName === "" ? "division" : assignName} = ${total}`
//             }
//         }
//         if (value.name === "if") {
//             let signOperator = value.data.option;
//             pythonCode = {
//                 condition: `if ${value.data.num1} ${signOperator} ${value.data.num2}:`,
//                 true: "print(true)",
//                 else: "else:",
//                 false:"print(false)" 
//             }
//         }
//         if (value.name === "for") {
//             pythonCode = {
//                 condition: `for ${value.data.num1} in ${value.data.num2}:`,
//                 result: `print('Hello world!')`,
//             }
//         }
//         if(value.name === "nodeCondition") {
//             pythonCodePrint = {
//                 loop: `${value.data.conditionResult}`
//             }
//         }
//         // jsToPython.value = pythonCode;
//         // jsToPythonCount.value = pythonCodePrint;
//         $store.commit('setJsToPython', pythonCode)
//         $store.commit('setJsToPythonCount', pythonCodePrint)
//         return pythonCode;
//     });
// }