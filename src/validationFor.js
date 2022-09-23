import store from "./store/index";

function validationFor(num1, num2) {
    let result = 0;
    let message = "";
    let jsonArr = [];
    while (num1 < num2) {
        jsonArr.push({
            number: `${result}`,
            variable: 'Hello world!'
        })
        num1++;
        result++;

    }
    message = `Executed: ${result} times`;
    jsToPythonCycle.value = jsonArr;
    return message;
}