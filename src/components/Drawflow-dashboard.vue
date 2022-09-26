<template>
    <div className="h-full w-full mx-2">
        <div className="flex justify-end mb-3 text-lg text-gray-100">
            <input className="text-sm mr-2 rounded-sm" placeholder="Add program name" @input="addProgramName($event)" v-model="nodeProgramName" />
            <button className="w-32 bg-green-500 mr-3 rounded-md" @click="setData()" :disabled="!nodeProgramName.length">
                Save
            </button>
            <select className="w-32 bg-blue-400 mr-3 rounded-md" @click="getData()" @change="valueSelected($event)">
                    <option value="Select" className="text-center">Choose</option>
                    <option v-for="j in store.state.programOptions" :key="j.id" :value="j.id">{{`${j.programName}#${j.name}`}}</option>
            </select>
            <button className="w-32 bg-red-400 mr-3 rounded-md" @click="deleteData(); cleanEditor(); getData()">Delete</button>
        </div>
        
        <div class="h-3/4 flex flex-row w-full">
            <div className="w-[190px] text-sm mx-auto p-2">
                <div class="nodes-list" draggable="true" v-for="i in nodesList" :key="i" :node-item="i.item" @dragstart="drag($event)">
                    <span class="node" :style="`background: ${i.color}`">{{ i.name }}</span>
                </div>
            </div>
            <div className="h-[700px] w-full mx-2 relative">
                <div id="drawflow" @drop="drop($event)" @dragover="allowDrop($event)"></div>
                <button className="absolute w-20 bg-blue-400 m-2 rounded-md text-white text-sm right-0 top-0" @click="cleanEditor()">Clear</button>
            </div>
            <PythonCode />
        </div>
    </div>    
</template>

<script>
    import {useStore} from 'vuex'
    import { h, getCurrentInstance, render, onMounted, shallowRef} from 'vue'
    import Drawflow from 'drawflow'
    // eslint-disable-next-line no-unused-vars
    import styleDrawflow from 'drawflow/dist/drawflow.min.css' 
    import style from '../assets/style.css' 
    import NodeNumber from './Node-number.vue'
    import NodeOperation from './Node-operation.vue'
    import NodeAssign from './Node-assign.vue'
    import NodeIf from './Node-if.vue'
    import NodeCondition from './Node-condition.vue'
    import NodeFor from './Node-for.vue'
    import PythonCode from './Python-code.vue'
    import {javascriptToPython} from '../utils/javascriptToPython'
    import {validationIf} from '../utils/validationIf'
    import {validationFor} from '../utils/validationFor'
    import { operationValues } from '@/utils/operationValues'
    import { nodesList } from '../utils/nodesList'
    import { getData } from '../api/getData'
    import { deleteData } from '../api/deleteData'

    export default {
    name: "DrawflowDashboard",
    data() {
        return {
            nodeProgramName: "",
        };
    },
    setup() {
        const store = useStore();
        const showNodes = shallowRef("");
        const optionSelected = shallowRef(0);
        const programName = shallowRef();
        const editor = shallowRef({});

        const Vue = { version: 3, h, render };
        const internalInstance = getCurrentInstance();
        internalInstance.appContext.app._context.config.globalProperties.$df = editor;
        let node_move_select = "";
        let node_last_move = null;

        const drag = (ev) => {
            if (ev.type === "touchstart") {
                console.log("drag", ev);
                node_move_select = ev.target.closest(".nodes-list").getAttribute("node-item");
            }
            else {
                ev.dataTransfer.setData("node", ev.target.getAttribute("node-item"));
            }
        };

        const allowDrop = (ev) => {
            ev.preventDefault();
        };

        const drop = (ev) => {
            if (ev.type === "touchend") {
                console.log("drop", ev);
                let parentdrawflow = document.elementFromPoint(node_last_move.touches[0].clientX, node_last_move.touches[0].clientY).closest("#drawflow");
                if (parentdrawflow != null) {
                    addNodeToDrawFlow(node_move_select, node_last_move.touches[0].clientX, node_last_move.touches[0].clientY);
                }
            }
            else {
                ev.preventDefault();
                let data = ev.dataTransfer.getData("node");
                addNodeToDrawFlow(data, ev.clientX, ev.clientY); //node name, x pos, y pos
            }
        };

        const addNodeToDrawFlow = (name, pos_x, pos_y) => {
            pos_x = pos_x * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().x
                * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)));
            pos_y = pos_y * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().y
                * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)));
            const nodeSelected = nodesList.find(object => object.item === name);
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, { number: 0, num1: 0, num2: 0 }, name, "vue");
        };

        const valueSelected = (event) => {
            optionSelected.value = event.target.value;
            store.commit("setProgramId", store.state.programOptions[optionSelected.value].name);
            showSelected();
        };

        const addProgramName = (event) => {
            programName.value = event.target.value;
        };

        onMounted(() => {
            const id = document.getElementById("drawflow");
            editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
            editor.value.start();
            let num1 = 0, num2 = 0, result = 0;
            editor.value.registerNode("number", <NodeNumber />, {}, {});
            editor.value.registerNode("addition", <NodeOperation title="Addition"/>, {}, {});
            editor.value.registerNode("subtraction", <NodeOperation title="Subtraction"/>, {}, {});
            editor.value.registerNode("multiplication", <NodeOperation title="Multiplication"/>, {}, {});
            editor.value.registerNode("division", <NodeOperation title="Division"/>, {}, {});
            editor.value.registerNode("assign", <NodeAssign />, {}, {});
            editor.value.registerNode("if", <NodeIf title="If statement"/>, {}, {});
            editor.value.registerNode("for", <NodeFor title="For statement"/>, {}, {});
            editor.value.registerNode("nodeCondition", <NodeCondition />, {}, {});
           
            editor.value.on("nodeDataChanged", (data) => {
                const nodeData = editor.value.getNodeFromId(data);
                let variableName = "";
                if (nodeData.name === "assign") {
                    variableName = nodeData.data.variable;
                    if (nodeData.inputs.input_1.connections.length > 0) {
                        javascriptToPython(variableName, editor.value.export(), num1, num2);
                    }
                }
                else {
                    const outputNode = nodeData.outputs.output_1.connections;
                    if (outputNode.length > 0) {
                        const outputNumber = parseFloat(nodeData.data.number);
                        const output_class = nodeData.outputs.output_1.connections[0].output;
                        const inputNodeId = nodeData.outputs.output_1.connections[0].node;
                        const inputNodeData = editor.value.getNodeFromId(inputNodeId);
                        const inputNodeName = inputNodeData.name;
                        console.log("inputnode", inputNodeName)
                        if (inputNodeName !== "nodeCondition") {
                            updateNodeOperation(output_class, outputNumber, inputNodeName, inputNodeData)

                            if (inputNodeData.outputs.output_1.connections.length > 0) {
                                const nodeAssignId = inputNodeData.outputs.output_1.connections[0].node;
                                updateNodeAssign(nodeAssignId, editor.value.getNodeFromId(nodeAssignId).data, result)
                            }
                        }
                        updateNodeCondition(nodeData, inputNodeData, inputNodeName, nodeData.name);

                        javascriptToPython(variableName, editor.value.export(), num1, num2);
                    }
                }
            });
            editor.value.on("connectionCreated", (data) => {
                console.log(data);
                const outputData = editor.value.getNodeFromId(data.output_id);
                const outputNumber = parseFloat(outputData.data.number);
                const output_class = data.input_class;
                const inputNodeData = editor.value.getNodeFromId(data.input_id);
                const inputNodeName = inputNodeData.name;
                const conditionName = outputData.name;
                let variableName = "";
                
                if (inputNodeName !== "assign" && inputNodeName !== "nodeCondition") {
                    updateNodeOperation(output_class, outputNumber, inputNodeName, inputNodeData)

                    if (inputNodeData.outputs.output_1.connections.length > 0) {
                        const nodeAssignId = inputNodeData.outputs.output_1.connections[0].node;
                        updateNodeAssign(nodeAssignId, editor.value.getNodeFromId(nodeAssignId).data, result)
                    }
                }
                else {
                    variableName = inputNodeData.data.variable;
                    updateNodeAssign(inputNodeData.id, inputNodeData.data, result)
                }
                updateNodeCondition(outputData, inputNodeData, inputNodeName, conditionName);

                javascriptToPython(variableName, editor.value.export(), num1, num2);
            });
            editor.value.on("import", () => {
                const editorData = editor.value.export().drawflow.Home.data;
                let variableName = "";
                Object.keys(editorData).forEach(function (i) {
                    if (editorData[i].name === "assign") {
                        variableName = editorData[i].data.variable;
                    }
                    if (editorData[i].name === "number") {
                        if (editorData[i].outputs.output_1.connections[0].output === "input_1") {
                            num1 = parseFloat(editorData[i].data.number);
                        }
                        if (editorData[i].outputs.output_1.connections[0].output === "input_2") {
                            num2 = parseFloat(editorData[i].data.number);
                        }
                    }
                });
                javascriptToPython(variableName, editor.value.export(), num1, num2);
            });
            editor.value.on("nodeRemoved", () => {
                const editorData = editor.value.export().drawflow.Home.data;
                let variableName = "";
                let result = "";
                Object.keys(editorData).forEach(function (i) {
                    if (editorData[i].name === "addition" || editorData[i].name === "subtraction" || editorData[i].name === "division" || editorData[i].name === "multiplication") {
                        result = operationValues(num1, num2, editorData[i].name, editorData[i]);
                        const input_id = editorData[i].id;
                        editor.value.updateNodeDataFromId(input_id, { result });
                    }
                    if (editorData[i].name === "assign") {
                        variableName = editorData[i].data.variable;
                        editor.value.updateNodeDataFromId(editorData[i].id, { ...editorData[i].data, assign: result });
                    }
                    javascriptToPython(variableName, editor.value.export(), num1, num2);
                });
            });

            const updateNodeOperation = (output_class, outputNumber, inputNodeName, inputNodeData) => {
                if (output_class == "input_1") {
                    num1 = outputNumber;
                }
                else if (output_class === "input_2") {
                    num2 = outputNumber;
                }
                result = operationValues(num1, num2, inputNodeName, inputNodeData);
                const input_id = inputNodeData.id;
                editor.value.updateNodeDataFromId(input_id, {result: result });
            }

            const updateNodeAssign = (nodeId, nodeData, result) => {
                const nodeAssignId = nodeId;
                const nodeAssignData = nodeData;
                editor.value.updateNodeDataFromId(nodeAssignId, {...nodeAssignData, assign: result});
            }

            const updateNodeCondition = (outputData, inputNodeData, inputNodeName, conditionName) => {
                if (inputNodeName === "nodeCondition" && conditionName === "if") {
                    const conditionResult = validationIf(parseFloat(outputData.data.num1), parseFloat(outputData.data.num2), outputData.data.option);
                    const input_id = inputNodeData.id;
                    editor.value.updateNodeDataFromId(input_id, {conditionResult});
                }
                if (inputNodeName === "nodeCondition" && conditionName === "for") {
                    const conditionResult = validationFor(parseFloat(outputData.data.num1), parseFloat(outputData.data.num2));
                    const input_id = inputNodeData.id;
                    editor.value.updateNodeDataFromId(input_id, {conditionResult});
                }
            }
        });


        
        function editorData() {
            const exportdata = editor.value.export();
            const nodes = exportdata.drawflow.Home.data;
            let nodesData = [];
            Object.keys(nodes).forEach(function (i) {
                nodesData.push(nodes[i]);
            });
            return { programName: programName.value, nodesData };
        }
        const setData = async () => {
            fetch("http://localhost:5000/setAllPrograms", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(editorData())
            });
        };
        function showSelected() {
            cleanEditor();
            const validate = store.state.jsImport;
            if (!!validate === true) {
                const jsonOption = validate.get[optionSelected.value].nodesData;
                const arrayOfNodesNew = [];
                jsonOption.forEach((value) => {
                    let newData;
                    if (!!value.inputs === false) {
                        newData = {
                            ...value,
                            inputs: {}
                        };
                    }
                    else if (!!value.outputs === false) {
                        newData = {
                            ...value,
                            outputs: {}
                        };
                    }
                    else if (!!value.data === false) {
                        newData = {
                            ...value,
                            data: {}
                        };
                    }
                    else {
                        newData = {
                            ...value
                        };
                    }
                    arrayOfNodesNew.push(newData);
                });
                let newObject = {};
                arrayOfNodesNew.forEach((element, index) => {
                    let id = arrayOfNodesNew[index].id;
                    newObject[id] = arrayOfNodesNew[index];
                });

                const ob = { drawflow: {
                        Home: {
                            data: newObject
                        }
                    }
                };
                showNodes.value = ob;
                editor.value.reroute = true;
                editor.value.import(showNodes.value);
            }
        }
        function cleanEditor() {
            editor.value.clear();
            store.commit("setJsToPython", "");
            store.commit("setJsToPythonCount", "");
            store.commit("setJsToPythonBucle", []);
        }
        return {
            nodesList,
            drag,
            drop,
            allowDrop,
            showNodes,
            getData,
            setData,
            valueSelected,
            cleanEditor,
            deleteData,
            store,
            addProgramName,
            editorData, style
        };
    },
    components: { PythonCode }
}
</script>

<style scoped>
    .node {
        background-color: #4a8ac2;
        color:#f7f7f7;
        font-size: medium;
        padding: 5px;
        border-radius: 8px;
        border: 2px solid #4b769bc4;
        display: block;
        height: 50px;
        margin: 10px 0px;
        cursor: move;
    }

    #drawflow {
      text-align:initial;
      width: 100%;
      height: 100%;
      background: #f1eeee;
      background-size: 20px 20px;
      background-image: radial-gradient(#c5c3c3 1px, transparent 1px);
    }
</style>