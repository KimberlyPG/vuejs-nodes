<template>
    <div className="h-full mx-2">
        <div className="flex justify-end mb-3 text-lg">
            <button className="w-40 bg-green-500 text-gray-100 mr-3 rounded-md" @click="setData">
                Save
            </button>
            <select className="w-40 bg-blue-400 text-gray-100 rounded-md" name="" id="">
                <option value="">Select program</option>
                <option value=""> Program 1</option>
                <option value="">Program 2</option>
            </select>
            <button @click="PutNodes">show</button>
            <button @click="importNodeData">GET</button>
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
                        <p>{{jsToPython.num1}}</p>
                        <p>{{jsToPython.num2}}</p>
                        <p>{{jsToPython.operation}}</p>
                        <p>{{jsToPython.variable}}</p>
                        <p>{{jsToPython.condition}}</p>
                        <p className="ml-5">{{jsToPython.true}}</p>
                        <p>{{jsToPython.else}}</p>
                        <p className="ml-5">{{jsToPython.false}}</p>
                        <p className="ml-5">{{jsToPython.result}}</p>
                        <p className="text-sm mt-4 mb-2">{{jsToPythonCount.loop}}</p>

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
    import { h, getCurrentInstance, render, readonly, onMounted, shallowRef } from 'vue'
    // import { useStore } from 'vuex'
    import NodeNumber from './Node-number.vue'
    import NodeOperation from './Node-operation.vue'
    import NodeAssign from './Node-assign.vue'
    import NodeIf from './Node-if.vue'
    import NodeCondition from './Node-condition.vue'
    import NodeFor from './Node-for.vue'
    // import axios from 'axios'

    export default {
    name: "DrawflowDashboard",
    setup() {
        const nodesList = readonly([
            {
                name: "Number",
                item: "number",
                input: 0,
                output: 1,
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

        const jsToPython = shallowRef('');
        const jsToPythonCycle = shallowRef('');
        const jsToPythonCount = shallowRef('');
        const showNodes = shallowRef('');

        const editor = shallowRef({});
        const Vue = { version: 3, h, render };
        const internalInstance = getCurrentInstance();
        internalInstance.appContext.app._context.config.globalProperties.$df = editor;
        // const { dispatch } = useStore(); 
        // position of the node
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
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {}, name, "vue");
        };

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
               getData();

                const nodeData = editor.value.getNodeFromId(data);
                let variableName = "";

                if (nodeData.name == "assign") {
                    variableName = nodeData.data.name;
                    if (nodeData.inputs.input_1.connections.length > 0) {
                        javascriptToPython(variableName);
                    }
                }
                else {
                    const outputNode = nodeData.outputs.output_1.connections;
                    if (outputNode.length > 0) {
                        const outputNumber = parseInt(nodeData.data.number);
                        const nodeDataOuput = nodeData.outputs.output_1.connections[0].output;
                        const inputNodeId = nodeData.outputs.output_1.connections[0].node;
                        const inputNodeData = editor.value.getNodeFromId(inputNodeId);
                        const inputNodeName = inputNodeData.name;
                        const outputTotal = parseInt(inputNodeData.data.result);

                        if (inputNodeName === "subtraction" || inputNodeName === "addition" || inputNodeName === "multiplication" || inputNodeName === "division") {
                            total = outputTotal;
                            const objectOperation = {
                                assign: total
                            };
                            const nodeOperation = editor.value.getNodeFromId(outputNode[0].node);
                            const nodeOperationConnections = nodeOperation.outputs.output_1.connections;
                            if (nodeOperationConnections.length > 0) {
                                const operationValue = editor.value;
                                const node_id = nodeOperation.outputs.output_1.connections[0].node;
                                operationValue.updateNodeDataFromId(node_id, objectOperation);
                            }
                        }
                        if (inputNodeName !== "assign") {
                            if (nodeDataOuput == "input_1") {
                                num1 = outputNumber;
                            }
                            else if (nodeDataOuput == "input_2") {
                                num2 = outputNumber;
                            }
                            let result = operationValues(num1, num2, inputNodeName);
                            const objectOperation = {
                                result: result
                            };
                            const operationValue = editor.value;
                            const input_id = inputNodeData.id;
                            operationValue.updateNodeDataFromId(input_id, objectOperation);
                        }
                        if (inputNodeName === "nodeCondition" && nodeData.name == "if") {
                            const conditionResult = validateIf(parseInt(nodeData.data.num1), parseInt(nodeData.data.num2), nodeData.data.option);
                            const objectOperation = {
                                ifResult: conditionResult
                            };
                            const operationValue = editor.value;
                            const input_id = inputNodeData.id;
                            operationValue.updateNodeDataFromId(input_id, objectOperation);
                        }
                        if (inputNodeName === "nodeCondition" && nodeData.name === "for") {
                            const conditionResult = validateFor(parseInt(nodeData.data.num1), parseInt(nodeData.data.num2));
                            const objectOperation = {
                                forResult: conditionResult
                            };
                            const operationValue = editor.value;
                            const input_id = inputNodeData.id;
                            operationValue.updateNodeDataFromId(input_id, objectOperation);
                        }
                        javascriptToPython(variableName);
                    }
                }
            });

            editor.value.on("connectionCreated", (data) => {
                const output = editor.value.getNodeFromId(data.output_id);
                const outputNumber = parseInt(output.data.number);
                const nodeDataOuput = output.outputs.output_1.connections[0].output;
                const outputTotal = parseInt(output.data.result);
                const inputData = editor.value.getNodeFromId(data.input_id);
                const nodeName = inputData.name;
                const conditionName = output.name;
                let variableName = "";

                if (nodeName !== "assign") {
                    if (nodeDataOuput == "input_1") {
                        num1 = outputNumber;
                    }
                    else if (nodeDataOuput == "input_2") {
                        num2 = outputNumber;
                    }
                    let result = operationValues(num1, num2, nodeName);
                    const objectOperation = {
                        result: result
                    };
                    const operationValue = editor.value;
                    const input_id = editor.value.getNodeFromId(data.input_id).id;
                    operationValue.updateNodeDataFromId(input_id, objectOperation);
                }
                else {
                    variableName = inputData.data.name;
                    total = outputTotal;
                    const objectOperation = {
                        assign: total
                    };
                    const operationValue = editor.value;
                    const input_id = editor.value.getNodeFromId(data.input_id).id;
                    operationValue.updateNodeDataFromId(input_id, objectOperation);
                }
                if (nodeName === "nodeCondition" && conditionName === "if") {
                    const conditionResult = validateIf(parseInt(output.data.num1), parseInt(output.data.num2), output.data.option);
                    const objectOperation = {
                        conditionResult: conditionResult
                    };
                    const operationValue = editor.value;
                    const input_id = editor.value.getNodeFromId(data.input_id).id;
                    operationValue.updateNodeDataFromId(input_id, objectOperation);
                }
                if (nodeName === "nodeCondition" && conditionName === "for") {
                    const conditionResult = validateFor(parseInt(output.data.num1), parseInt(output.data.num2));
                    const objectOperation = {
                        conditionResult: conditionResult
                    };
                    const operationValue = editor.value;
                    const input_id = editor.value.getNodeFromId(data.input_id).id;
                    operationValue.updateNodeDataFromId(input_id, objectOperation);
                }
                javascriptToPython(variableName);
            });
        });

        function operationValues(num1, num2, nodeName) {
            let result = 0;
            switch (nodeName) {
                case "addition":
                    result = num1 + num2;
                    break;
                case "subtraction":
                    result = num1 - num2;
                    break;
                case "multiplication":
                    result = num1 * num2;
                    break;
                case "division":
                    result = num1 / num2;
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

        function javascriptToPython(variableName) {
            const exportdata = editor.value.export();
            const dataNodes = exportdata.drawflow.Home.data;
            const data = exportdata
            console.log("exportdata", data)

            let num1 = null;
            let num2 = null;
            let total;
            let assignName = variableName;
            let pythonCode = '';
            let pythonCodePrint = '';

            Object.entries(dataNodes).forEach(([, value]) => {
                if (value.name === "number") {
                    if (num1 == null && value.outputs.output_1.connections.length === 1) {
                        num1 = value.data.number;
                    }
                    else if (num1 != null && value.outputs.output_1.connections.length === 1) {
                        num2 = value.data.number;
                    }
                }               
                if (value.name === "addition") {
                    total = value.data.result;
                    pythonCode = {
                        num1: `num1 = ${num1 == null ? 0 : num1}`,
                        num2: `num2 = ${num2 == null ? 0 : num2}`,
                        operation: "# addition = num1 + num2",
                        variable: `${assignName === undefined || assignName === "" ? "add" : assignName} = ${total}`
                    }
                }
                if (value.name === "subtraction") {
                    total = value.data.result;
                    pythonCode = {
                        num1: `num1 = ${num1 == null ? 0 : num1}`,
                        num2: `num2 = ${num2 == null ? 0 : num2}`,
                        operation: "# subtraction = num1 - num2",
                        variable: `${assignName === undefined || assignName === "" ? "sub" : assignName} = ${total}`
                    }
                }
                if (value.name === "multiplication") {
                    total = value.data.result;
                    pythonCode = {
                        num1: `num1 = ${num1 == null ? 0 : num1}`,
                        num2: `num2 = ${num2 == null ? 0 : num2}`,
                        operation: "# multiplication = num1 * num2",
                        variable: `${assignName === undefined || assignName === "" ? "multiplication" : assignName} = ${total}`
                    }
                }
                if (value.name === "division") {
                    total = value.data.result;
                    pythonCode = {
                        num1: `num1 = ${num1 == null ? 0 : num1}`,
                        num2: `num2 = ${num2 == null ? 0 : num2}`,
                        operation: "# division = num1 / num2",
                        variable: `${assignName === undefined || assignName === "" ? "division" : assignName} = ${total}`
                    }
                }
                if (value.name === "if") {
                    let signOperator = value.data.option;
                    pythonCode = {
                        condition: `if ${value.data.num1} ${signOperator} ${value.data.num2}:`,
                        true: "print(true)",
                        else: "else:",
                        false:"print(false)" 
                    }
                }
                if (value.name === "for") {
                    pythonCode = {
                        condition: `for ${value.data.num1} in ${value.data.num2}:`,
                        result: `print('Hello world!')`,
                    }
                }
                if(value.name === "nodeCondition") {
                    pythonCodePrint = {
                        loop: `${value.data.conditionResult}`
                    }
                }
                jsToPython.value = pythonCode;
                jsToPythonCount.value = pythonCodePrint;
                return pythonCode;
            });
        }

        function EditorData () {
            const exportdata = editor.value.export();
            const nodes = exportdata.drawflow.Home.data;
           
            let nodesData = []
            Object.keys(nodes).forEach(function(i){
                nodesData.push(nodes[i]);
            });

            let jsonFormat = {
                drawflow: {
                    Home: {
                        nodesData
                    }
                }
            }

            return jsonFormat;
        }

        const getData = async()=>{
            fetch('http://localhost:5000/getAllPrograms', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            .then((response) => response.json())
            // .then((json) => importNodeData(json))
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

        
        function importNodeData(){
            const json = {
            "Home": {
                "uid": "0x26128373",
                "data": [
                    {
                        "id": 2,
                        "data": [{
                            "uid": "0x26128373",
                            "number": "2"
                        }],
                        "class": "number",
                        "html": "number",
                        "typenode": "vue",
                        "inputs": {},
                        "outputs": {
                            "output_1": {
                                "connections": [
                                    {
                                        "node": "3",
                                        "output": "input_2"
                                    }
                                ]
                            }
                        },
                        "name": "number",
                        "pos_x": 73,
                        "pos_y": 166
                    },
                    {
                        "id": 3,
                        "name": "addition",
                        "data": [{
                            "result": 5
                        }],
                        "class": "addition",
                        "html": "addition",
                        "typenode": "vue",
                        "inputs": {
                            "input_1": {
                                "connections": [
                                    {
                                        "node": "1",
                                        "input": "output_1"
                                    }
                                ]
                            },
                            "input_2": {
                                "connections": [
                                    {
                                        "node": "2",
                                        "input": "output_1"
                                    }
                                ]
                            }
                        },
                        "outputs": {
                            "output_1": {
                                "connections": [
                                    {
                                        "node": "4",
                                        "output": "input_1"
                                    }
                                ]
                            }
                        },
                        "pos_x": 274,
                        "pos_y": 111
                    },
                    {
                        "name": "number",
                        "data": [{
                            "number": "3"
                        }],
                        "class": "number",
                        "html": "number",
                        "typenode": "vue",
                        "inputs": {},
                        "id": 1,
                        "outputs": {
                            "output_1": {
                                "connections": [
                                    {
                                        "node": "3",
                                        "output": "input_1"
                                    }
                                ]
                            }
                        },
                        "pos_x": 67,
                        "pos_y": 62
                    },
                    {
                        "id": 4,
                        "name": "assign",
                        "data":[{
                            "assign": 5},
                            {"name": "wei"}
                        ],
                        "class": "assign",
                        "html": "assign",
                        "typenode": "vue",
                        "inputs": {
                            "input_1": {
                                "connections": [
                                    {
                                        "node": "3",
                                        "input": "output_1"
                                    }
                                ]
                            }
                        },
                        "outputs": {},
                        "pos_x": 542,
                        "pos_y": 116
                    },
                    {
                        "id": 5,
                        "name": "if",
                        "data": [
                            {num1: "2"},
                            {option: "<"},
                            {num2: "4"}
                        ],
                        "class": "if",
                        "html": "if",
                        "typenode": "vue",
                        "inputs": {},
                        "outputs": {
                            "output_1": {
                                "connections": [
                                    {
                                        "node": "7",
                                        "output": "input_1"
                                    }
                                ]
                            }
                        },
                        "pos_x": 93,
                        "pos_y": 307
                    }]
                }
            }
            const dataArray =  json.Home.data                   
            const arrayofData = [];
            const arrayOfNodesNew = [];
            dataArray.map((value) => {
                const pos1 = value.data[0];
                const pos2 = value.data[1];
                const pos3 = value.data[2];
                const newData = {
                    ...pos1,
                    ...pos2,
                    ...pos3
                }
                arrayofData.push(newData);
            })

            dataArray.forEach((value, index) => {
                const newData = {
                    ...value,
                    data: arrayofData[index]
                }

                arrayOfNodesNew.push(newData);
            })

            console.log('Last final: ', arrayOfNodesNew);
            
            let newObject = {}
            for( var i=1; i < arrayOfNodesNew.length+1; i++) {
                newObject[i] = arrayOfNodesNew[i-1]
            }
            console.log("newObject", newObject)
            
            let data = newObject

            const ob = {drawflow: {
                    Home: {
                        data
                    }
                }
            }

            showNodes.value = ob;
            console.log("get", showNodes.value)
        }

        function PutNodes() {
            console.log("state nodes", showNodes.value)
            editor.value.import(showNodes.value);
        }
        

        return {
            nodesList,
            drag,
            drop,
            allowDrop,
            jsToPython,
            jsToPythonCount,
            jsToPythonCycle,
            setData,
            showNodes,
            PutNodes,
            getData,
            importNodeData
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