
// function editorData() {
//     const exportdata = editor.value.export();
//     const nodes = exportdata.drawflow.Home.data;

//     let nodesData = [];
//     Object.keys(nodes).forEach(function (i) {
//         nodesData.push(nodes[i]);
//     });
//     // store.commit('editorData', {nodesData})
//     // return {programName: programName.value, nodesData};
//     store.commit('setEditorData', programName.value)
//     store.commit('setEditorData', nodesData)
//     console.log("state", store.state.editorData)
// }
// import store from '../store/index'

// export const setData = async () => {
//     console.log(store.state.editorData)
//     fetch("http://localhost:5000/setAllPrograms", {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//         },
//         body: JSON.stringify(store.state.editorData)
//     })
// };