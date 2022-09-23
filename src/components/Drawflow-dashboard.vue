<template>
    <div className="h-full mx-2">
        <button @click="CleanEditor">Clean editor</button>
        <div className="flex justify-end mb-3 text-lg">
            <button className="w-40 bg-green-500 text-gray-100 mr-3 rounded-md" @click="setData">
                Save
            </button>
            <select className="w-40 bg-blue-400 text-gray-100 rounded-md" @click="getData" @change="valueSelected($event)">
                    <option value="Select">Choose</option>
                    <option v-for="j in programOptions" :key="j.id" :value="j.id">{{j.name}}</option>
            </select>
        </div>
        
        <div class="h-3/4 flex flex-row w-full">
            <div className="w-[190px] text-sm mx-auto p-2">
                <div class="nodes-list" draggable="true" v-for="i in nodesList" :key="i" :node-item="i.item" @dragstart="drag($event)">
                    <span class="node">{{ i.name }}</span>
                </div>
            </div>

            <div class="h-[700px] w-full mx-2">
                <div id="drawflow" @drop="drop($event)" @dragover="allowDrop($event)"></div>
            </div>
            <div className="bg-white text-black w-1/4 flex">
                <div className="w-full">
                    <div className="flex">
                        <img 
                        className="w-10"
                        src='../assets/python.jpg' 
                        alt=""
                        >
                        <h3 className="text-gray-700">
                            Python code
                        </h3>
                    </div>

                    <div className="text-gray-600">
                        <p>{{store.state.jsToPython.num1}}</p>
                        <p>{{store.state.jsToPython.num2}}</p>
                        <p>{{store.state.jsToPython.operation}}</p>
                        <p>{{store.state.jsToPython.variable}}</p>
                        <p>{{store.state.jsToPython.condition}}</p>
                        <p className="ml-5">{{store.state.jsToPython.true}}</p>
                        <p>{{store.state.jsToPython.else}}</p>
                        <p className="ml-5">{{store.state.jsToPython.false}}</p>
                        <p className="ml-5">{{store.state.jsToPython.result}}</p>
                        <p className="text-sm mt-4 mb-2">{{store.state.jsToPythonCount.loop}}</p>
                        <div className="text-sm text-black h-52 overflow-y-scroll scrollbar-hide">
                            <div v-for="i in jsToPythonCycle" :key="i.number">
                                <p>{{ i.number + " "+ i.variable }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
    import Drawflow from 'drawflow'
    // eslint-disable-next-line no-unused-vars
    import styleDrawflow from 'drawflow/dist/drawflow.min.css' 
    import { h, getCurrentInstance, render, readonly, onMounted, shallowRef} from 'vue'
    import NodeNumber from './Node-number.vue'
    import NodeOperation from './Node-operation.vue'
    import NodeAssign from './Node-assign.vue'
    import NodeIf from './Node-if.vue'
    import NodeCondition from './Node-condition.vue'
    import NodeFor from './Node-for.vue'
    import {javascriptToPython} from '../javascriptToPython'
    import {useStore} from 'vuex'

    export default {
        name: "DrawflowDashboard",
    setup() {   
        const store = useStore();
        // const jsToPython = computed(() => store.getters.jsToPythonData)
        const nodesList = readonly([
            {
                name: "Number",
                item: "number",
                input: 0,
                output: 1,
                number: 0
            },
            {
                name: "Addition",
                item: "addition",
                input: 2,
                output: 1,
            },
            {
                name: "Subtraction",
                item: "subtraction",
                input: 2,
                output: 1,
            },
            {
                name: "Multiplication",
                item: "multiplication",
                input: 2,
                output: 1,
            },
            {
                name: "Division",
                item: "division",
                input: 2,
                output: 1,
            },
            {
                name: "Assign",
                item: "assign",
                input: 1,
                output: 0
            },
            {
                name: "If-else",
                item: "if",
                input: 0,
                output: 1
            },
            {
                name: "For",
                item: "for",
                input: 0,
                output: 1
            },
            {
                name: "Condition result",
                item: "nodeCondition",
                input: 1,
                output: 0
            },
        ]);

        const jsToPythonCycle = shallowRef('');
        const showNodes = shallowRef('');
        const programOptions = shallowRef('');
        const optionSelected = shallowRef(0);
        const jsonImport = shallowRef({});   
        
        const editor = shallowRef({});
        const Vue = { version: 3, h, render };
        const internalInstance = getCurrentInstance();
        internalInstance.appContext.app._context.config.globalProperties.$df = editor;


        let node_move_select = "";
        let node_last_move = null;
        // node taken
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
        // node dropped
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

        // drop node into drarflow editor
        const addNodeToDrawFlow = (name, pos_x, pos_y) => {
            pos_x = pos_x * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().x
            * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)));
            pos_y = pos_y * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().y
            * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)));
            // adding node to drawflow
            const nodeSelected = nodesList.find(object => object.item == name);
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {number: 0, num1: 0, num2: 0}, name, "vue");
        };
        
        const valueSelected = (event) => {
            optionSelected.value = event.target.value;
            console.log(optionSelected.value)
            showSelected();
        }
        
        onMounted(() => {
            const id = document.getElementById("drawflow");
            editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
            editor.value.start();
            let num1 = 0;
            let num2 = 0;
            let total = 0;
            // registering nodes on the editor
            editor.value.registerNode("number", <NodeNumber />, {}, {});
            editor.value.registerNode("addition", <NodeOperation title="Addition"/>, {}, {});
            editor.value.registerNode("subtraction", <NodeOperation title="Subtraction"/>, {}, {});
            editor.value.registerNode("multiplication", <NodeOperation title="Multiplication"/>, {}, {});
            editor.value.registerNode("division", <NodeOperation title="Division"/>, {}, {});
            editor.value.registerNode("assign", <NodeAssign />, {}, {});
            editor.value.registerNode("if", <NodeIf title="If statement"/>, {}, {});
            editor.value.registerNode("for", <NodeFor title="For statement"/>, {}, {});
            editor.value.registerNode("nodeCondition", <NodeCondition />, {}, {});
            editor.value.registerNode("importedNodes", showNodes, {}, {})

            editor.value.on("nodeDataChanged", (data) => {

                const nodeData = editor.value.getNodeFromId(data);
                let variableName = "";

                if (nodeData.name == "assign") {
                    variableName = nodeData.data.variable;
                    if (nodeData.inputs.input_1.connections.length > 0) {
                        console.log("variableName change", variableName)
                        javascriptToPython(variableName, editor.value.export(), num1, num2);
                    }
                }
                else {
                    const outputNode = nodeData.outputs.output_1.connections;
                    if (outputNode.length > 0) {
                        const outputNumber = parseFloat(nodeData.data.number);
                        const nodeDataOuput = nodeData.outputs.output_1.connections[0].output;
                        const inputNodeId = nodeData.outputs.output_1.connections[0].node;
                        const inputNodeData = editor.value.getNodeFromId(inputNodeId);
                        const inputNodeName = inputNodeData.name;
                        const outputTotal = parseFloat(inputNodeData.data.result);

                        if (inputNodeName === "subtraction" || inputNodeName === "addition" || inputNodeName === "multiplication" || inputNodeName === "division") {
                            total = outputTotal;
                            const nodeOperation = editor.value.getNodeFromId(outputNode[0].node);
                            
                            
                            const nodeOperationConnections = nodeOperation.outputs.output_1.connections;
                            if (nodeOperationConnections.length > 0) {
                                const operationValue = editor.value;
                                const node_id = nodeOperation.outputs.output_1.connections[0].node;
                                const nodeAssignData = editor.value.getNodeFromId(node_id).data;
                                const objectOperation = {
                                    ...nodeAssignData,
                                    assign: total
                                };

                                operationValue.updateNodeDataFromId(node_id, objectOperation);
                            }
                        }
                        if (inputNodeName !== "assign" && inputNodeName !== "nodeCondition") {
                            if (nodeDataOuput == "input_1") {
                                num1 = outputNumber;
                            }
                            else if (nodeDataOuput == "input_2") {
                                num2 = outputNumber;
                            }
                            let result = operationValues(num1, num2, inputNodeName, inputNodeData);
                            const objectOperation = {
                                result: result
                            };
                            const operationValue = editor.value;
                            const input_id = inputNodeData.id;
                            operationValue.updateNodeDataFromId(input_id, objectOperation);
                        }
                        if (inputNodeName === "nodeCondition" && nodeData.name == "if") {
                            console.log("num1", nodeData.data.num1, "num2", nodeData.data.num2)
                            const conditionResult = validateIf(parseFloat(nodeData.data.num1), parseFloat(nodeData.data.num2), nodeData.data.option);
                            const objectOperation = {
                                conditionResult: conditionResult
                            };
                            const operationValue = editor.value;
                            const input_id = inputNodeData.id;
                            operationValue.updateNodeDataFromId(input_id, objectOperation);
                        }
                        if (inputNodeName === "nodeCondition" && nodeData.name === "for") {
                            const conditionResult = validateFor(parseFloat(nodeData.data.num1), parseFloat(nodeData.data.num2));
                            const objectOperation = {
                                conditionResult: conditionResult
                            };
                            const operationValue = editor.value;
                            const input_id = inputNodeData.id;
                            operationValue.updateNodeDataFromId(input_id, objectOperation);
                        }

                        javascriptToPython(variableName, editor.value.export(), num1, num2);
                    }
                }
            });

            editor.value.on("connectionCreated", (data) => {
                const output = editor.value.getNodeFromId(data.output_id);
                const outputNumber = parseFloat(output.data.number);
                const nodeDataOuput = output.outputs.output_1.connections[0].output;
                const outputTotal = parseFloat(output.data.result);
                const inputData = editor.value.getNodeFromId(data.input_id);
                const nodeName = inputData.name;
                const conditionName = output.name;
                let variableName = "";

                console.log(nodeName)
                if (nodeName !== "assign" && nodeName !== "nodeCondition") {
                    if (nodeDataOuput == "input_1") {
                        num1 = outputNumber;
                    }
                    else if (nodeDataOuput == "input_2") {
                        num2 = outputNumber;
                    }
                    let result = operationValues(num1, num2, nodeName, inputData);
                    const objectOperation = {
                        result: result
                    };
                    const operationValue = editor.value;
                    const input_id = editor.value.getNodeFromId(data.input_id).id;
                    operationValue.updateNodeDataFromId(input_id, objectOperation);
                }
                else {
                    variableName = inputData.data.variable;                      
                    total = outputTotal;
                    const jsonWIthValues = inputData.data;

                    const objectOperation = {
                        ...jsonWIthValues, 
                        assign: total
                    };
                    const operationValue = editor.value;
                    const input_id = editor.value.getNodeFromId(data.input_id).id;
                    operationValue.updateNodeDataFromId(input_id, objectOperation);
                }
                if (nodeName === "nodeCondition" && conditionName === "if") {
                    const jsonWIthValues = inputData.data;
                    const conditionResult = validateIf(parseFloat(output.data.num1), parseFloat(output.data.num2), output.data.option);
                    const objectOperation = {
                        ...jsonWIthValues,
                        conditionResult: conditionResult
                    };
                    const operationValue = editor.value;
                    const input_id = editor.value.getNodeFromId(data.input_id).id;
                    operationValue.updateNodeDataFromId(input_id, objectOperation);
                }
                if (nodeName === "nodeCondition" && conditionName === "for") {
                    const jsonWIthValues = inputData.data;
                    const conditionResult = validateFor(parseFloat(output.data.num1), parseFloat(output.data.num2));
                    const objectOperation = {
                        ...jsonWIthValues,
                        conditionResult: conditionResult
                    };
                    const operationValue = editor.value;
                    const input_id = editor.value.getNodeFromId(data.input_id).id;
                    operationValue.updateNodeDataFromId(input_id, objectOperation);
                }
                javascriptToPython(variableName, editor.value.export(), num1, num2);
            });
        });

        function operationValues(num1, num2, nodeName, node) {
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

        function validateIf(num1, num2, nodeName) {
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

        function validateFor(num1, num2) {
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

        function EditorData () {
            const exportdata = editor.value.export();
            const nodes = exportdata.drawflow.Home.data;

            console.log('Editor data: ', exportdata);
           
            let nodesData = []
            Object.keys(nodes).forEach(function(i){
                nodesData.push(nodes[i]);
            });
            return {nodesData};
        }

        const getData = async()=>{
            fetch('http://localhost:5000/getAllPrograms', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((json) => {
                importNodeData(json);
                jsonImport.value = json;
            })
        }
                    
        function importNodeData(json){
            const arrayDropdown = [];

            json.get.forEach((element, index) => {
                arrayDropdown.push({id: index, name: element.uid});
            })

            programOptions.value = arrayDropdown
        }

        function showSelected() {
            const validate = jsonImport.value
            if(!!validate == true){
                const jsonOption = validate.get[optionSelected.value].nodesData;
                const arrayOfNodesNew = [];
                jsonOption.forEach((value) => {
                let newData;
                if(!!value.inputs === false) {
                    newData = {
                        ...value,
                        inputs: {}
                    }
                } else if (!!value.outputs === false) {
                    newData = {
                        ...value,
                        outputs: {}
                    }
                } else if (!!value.data === false) {
                    newData = {
                        ...value,
                        data: {}
                    }
                } else {
                    newData = {
                        ...value
                    }
                }
                    arrayOfNodesNew.push(newData);
                })
            
                let newObject = {}
                for( var i=1; i < arrayOfNodesNew.length+1; i++) {
                    newObject[i] = arrayOfNodesNew[i-1]
                }
                
                let data = newObject

                const ob = {drawflow: {
                        Home: {
                            data
                        }
                    }
                }

                showNodes.value = ob;
                editor.value.import(showNodes.value);
            }
        }

        const  setData = async()=>{
            fetch('http://localhost:5000/setAllPrograms', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: 
                    JSON.stringify(EditorData())         
            }).then(console.log(EditorData()))
        }

        function CleanEditor() {
            editor.value.clear()
        }

        return {
            nodesList,
            drag,
            drop,
            allowDrop,
            jsToPythonCycle,
            setData,
            showNodes,
            getData,
            importNodeData,
            programOptions,
            valueSelected,
            CleanEditor,
            store
        }
    }
}
</script>

<style scoped>
    .node {
        background-color: rgb(74, 138, 194);
        color:#f7f7f7;
        padding: 5px;
        border-radius: 8px;
        border: 2px solid #494949;
        display: block;
        height: 50px;
        margin: 10px 0px;
        cursor: move;
    }

    #drawflow {
      width: 100%;
      height: 100%;
      text-align: initial;
      background: #f1eeee;
      background-size: 20px 20px;
      background-image: radial-gradient(#b6b4b4 1px, transparent 1px);      
    }
    </style>