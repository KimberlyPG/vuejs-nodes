import store from '../store/index'

export const getData = async () => {
    fetch("http://localhost:5000/getAllPrograms", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((json) => {
        // importNodeData(json);
        // jsonImport.value = json;
        store.commit('setJsImport', json)
    });
};