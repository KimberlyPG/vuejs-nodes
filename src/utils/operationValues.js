export function operationValues(num1, num2, nodeName, node) {
    let result = 0;
    let number1 = 0;
    let number2 = 0;
    let inputs1 = node.inputs.input_1.connections.length
    let inputs2 = node.inputs.input_2.connections.length
    if(inputs1 > 0 && inputs2 > 0) {
        number1 = num1
        number2 = num2
    }
    else if(inputs1 > 0 && inputs2 == 0) {
        number1 = num1 
        number2 = 0
    } 
    else if(inputs1 == 0 && inputs2 > 0) {
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
            console.log("Error with the operation");
    }
    return result;
}