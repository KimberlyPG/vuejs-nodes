export function operationValues(num1, num2, nodeName, node) {
    let result = 0;
    let number1 = 0;
    let number2 = 0;
    if(node.inputs.input_1.connections.length > 0 && node.inputs.input_2.connections.length > 0) {
        number1 = num1
        number2 = num2
    }
    else if(node.inputs.input_1.connections.length > 0 && node.inputs.input_2.connections.length == 0) {
        number1 = num1 
        number2 = 0
    } 
    else if(node.inputs.input_1.connections.length == 0 && node.inputs.input_2.connections.length > 0) {
        number1 = 0
        number2 = num2
    }
    switch (nodeName) {
        case "addition":
            result = number1 + number2;
            break;
        case "subtraction":
            result = number1 - number2;
            break;
        case "multiplication":
            result = number1 * number2;
            break;
        case "division":
            result = number1 / number2;
            break;
        default:
            console.log("No name");
    }
    return result;
}