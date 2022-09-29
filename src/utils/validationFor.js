import store from "../store/index";

export function validationFor(num1, num2) {
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
    store.commit('setJsToPythonBucle', jsonArr) 
    return message;
}