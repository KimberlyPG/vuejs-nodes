// import store from '../store/index'

export const setData = async (editor) => {
    fetch("http://localhost:5000/setAllPrograms", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(editor)
    }).then(console.log(editor));
};