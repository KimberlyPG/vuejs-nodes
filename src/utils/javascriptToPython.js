import store from "../store/index";

export function javascriptToPython(variableName, editor, num1, num2) {
    const dataNodes = editor.drawflow.Home.data;
    let number1 = 0;
    let number2 = 0;
    let total;
    let assignName = variableName;
    let pythonCode = '';
    let pythonCodePrint = '';

    
    Object.entries(dataNodes).forEach(([, value]) => {
        if(value.name == 'addition' || value.name === 'subtraction' || value.name === 'multiplication' || value.name === 'division') {
            if(value.inputs.input_1.connections.length > 0 && value.inputs.input_2.connections.length > 0) {
                number1 = num1;
                number2 = num2;
            }
            else if(value.inputs.input_1.connections.length > 0 && value.inputs.input_2.connections.length == 0) {
                number1 = num1;
                number2 = 0;
            } 
            else if(value.inputs.input_1.connections.length == 0 && value.inputs.input_2.connections.length > 0) {
                number1 = 0;
                number2 = num2;
            }       
        }
        if (value.name === "addition") {
            total = value.data.result;
            pythonCode = {
                num1: `num1 = ${number1}`,
                num2: `num2 = ${number2}`,
                operation: "# addition = num1 + num2",
                variable: `${assignName === undefined || assignName === "" ? "add" : assignName} = ${total}`
            }
        }
        if (value.name === "subtraction") {
            total = value.data.result;
            pythonCode = {
                num1: `num1 = ${number1}`,
                num2: `num2 = ${number2}`,
                operation: "# subtraction = num1 - num2",
                variable: `${assignName === undefined || assignName === "" ? "sub" : assignName} = ${total}`
            }
        }
        if (value.name === "multiplication") {
            total = value.data.result;
            pythonCode = {
                num1: `num1 = ${number1}`,
                num2: `num2 = ${number2}`,
                operation: "# multiplication = num1 * num2",
                variable: `${assignName === undefined || assignName === "" ? "multiplication" : assignName} = ${total}`
            }
        }
        if (value.name === "division") {
            total = value.data.result;
            pythonCode = {
                num1: `num1 = ${number1}`,
                num2: `num2 = ${number2}`,
                operation: "# division = num1 / num2",
                variable: `${assignName === undefined || assignName === "" ? "division" : assignName} = ${total}`
            }
        }
        if (value.name === "if") {
            let signOperator = value.data.option;
            pythonCode = {
                condition: `if ${value.data.num1} ${signOperator} ${value.data.num2}:`,
                true: "print(true)",
                else: "else:",
                false:"print(false)" 
            }
        }
        if (value.name === "for") {
            pythonCode = {
                condition: `for ${value.data.num1} in ${value.data.num2}:`,
                result: `print('Hello world!')`,
            }
        }
        if(value.name === "nodeCondition") {
            pythonCodePrint = {
                loop: `${value.data.conditionResult}`
            }
        }

        store.commit('setJsToPython', pythonCode);
        store.commit('setJsToPythonCount', pythonCodePrint);
    });
}