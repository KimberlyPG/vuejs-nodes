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
            store.commit('setJsImport', json)
            importNodeData(json)
    });
};

function importNodeData(json) {
    const arrayDropdown = [];
    json.get.forEach((element, index) => {
        arrayDropdown.push({id: index, uid: element.uid, programName: element.programName});
    });
    store.commit('setProgramOptions', arrayDropdown)
}