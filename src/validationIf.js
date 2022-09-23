export function validationIf(num1, num2, nodeName) {
    let result = 'false';
    switch (nodeName) {
        case "<":
            if (num1 < num2) {
                result = 'true';
            }
            else {
                result = 'false';
            }
            break;
        case ">":
            if (num1 > num2) {
                result = 'true';
            }
            else {
                result = 'false';
            }
            break;
        case "<=":
            if (num1 <= num2) {
                result = 'true';
            }
            else {
                result = 'false';
            }
            break;
        case ">=":
            if (num1 >= num2) {
                result = 'true';
            }
            else {
                result = 'false';
            }
            break;
        case "=":
            if (num1 == num2) {
                result = 'true';
            }
            else {
                result = 'false';
            }
            break;
        default:
            console.log("No name");
    }
    return result;
}