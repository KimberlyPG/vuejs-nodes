import store from "../store/index";

export function javascriptToJava(variableName, editor, num1, num2) {
    const dataNodes = editor.drawflow.Home.data;
    let number1 = 0;
    let number2 = 0;
    let total;
    let assignName = variableName;
    let javaCode = '';
  
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
            javaCode = {
                num1: `float num1 = ${number1};`,
                num2: `float num2 = ${number2};`,
                operation: `float ${assignName === undefined || assignName === "" ? "addition" : assignName} = num1 + num2;`,          
                variable: `System.out.println("The result is: " + ${assignName === undefined || assignName === "" ? "addition" : assignName});`,
                console: `The result is: ${total}`
            }
        }
        if (value.name === "subtraction") {
            total = value.data.result;
            javaCode = {
                num1: `float num1 = ${number1};`,
                num2: `float num2 = ${number2};`,
                operation: `float ${assignName === undefined || assignName === "" ? "subtraction" : assignName} = num1 - num2;`,          
                variable: `System.out.println("The result is: " + ${assignName === undefined || assignName === "" ? "subtraction" : assignName});`,
                console: `The result is: ${total}`
            }
        }
        if (value.name === "multiplication") {
            total = value.data.result;
            javaCode = {
                num1: `float num1 = ${number1};`,
                num2: `float num2 = ${number2};`,
                operation: `float ${assignName === undefined || assignName === "" ? "multiplication" : assignName} = num1 * num2;`,          
                variable: `System.out.println("The result is: " + ${assignName === undefined || assignName === "" ? "multiplication" : assignName});`,
                console: `The result is: ${total}`
            }
        }
        if (value.name === "division") {
            total = value.data.result;
            javaCode = {
                num1: `float num1 = ${number1};`,
                num2: `float num2 = ${number2};`,
                operation: `float ${assignName === undefined || assignName === "" ? "division" : assignName} = num1 / num2;`,          
                variable: `System.out.println("The result is: " + ${assignName === undefined || assignName === "" ? "division" : assignName});`,
                console: `The result is: ${total}`
            }
        }
        if (value.name === "if") {
            let signOperator = value.data.option;
            javaCode = {
                condition: `if (${value.data.num1} ${signOperator} ${value.data.num2}) {`,
                true: "System.out.println(true);",
                else: "} else {",
                false:"System.out.println(false);",
                close: "}" 
            }
        }
        if (value.name === "for") {
            javaCode = {
                condition: `for(int i=${value.data.num1}; i<${value.data.num2}; i++) {`,
                do: 'System.out.println("Hello world!");',
                close: "}"
            }
        }
        if(value.name === "nodeCondition") {
            if(value.data.conditionResult === "true" || value.data.conditionResult === "false") {
                javaCode = {...javaCode,
                    consoleResult: `${value.data.conditionResult}`
                }
            }     
        }

        store.commit('setJsToJava', javaCode);
    });
}