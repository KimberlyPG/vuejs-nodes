<template>
    <div className="h-full mx-2">
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
                <div>
                    <div className="flex">
                        <img 
                        className="w-10"
                        src='../assets/python.jpg' 
                        alt=""
                        >
                        <h3 className="text-gray-700">Python code</h3>
                    </div>
                    <p className="text-gray-600">the code is...</p>
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

    export default {
        name: 'DrawflowDashboard',
        setup() {
            const nodesList = readonly([
                {
                    name: 'Number',
                    item: 'number',
                    input:0,
                    output:1,
                },
                {
                    name: 'Addition',
                    item: 'addition',
                    input:2,
                    output:1,
                },
                {
                    name: 'Subtraction',
                    item: 'subtraction',
                    input:2,
                    output:1,
                },
                {
                    name: 'Multiplication',
                    item: 'multiplication',
                    input:2,
                    output:1,
                },
                {
                    name: 'Division',
                    item: 'division',
                    input:2,
                    output:1,
                },
                {
                    name: 'Assign',
                    item: 'assign',
                    input: 1,
                    output: 0
                },
                {
                    name: 'If-else',
                    item: 'if',
                    input: 0,
                    output: 1 
                },
                {
                    name: 'For',
                    item: 'for',
                    input: 0,
                    output: 1 
                },
                {
                    name: 'Condition result',
                    item: 'nodeCondition',
                    input: 1,
                    output: 0 
                },
            ])

        const editor = shallowRef({})
        const Vue = { version: 3, h, render };
        const internalInstance = getCurrentInstance()
        internalInstance.appContext.app._context.config.globalProperties.$df = editor;
        // const { dispatch } = useStore(); 

        // position of the node
        let node_move_select = '';
        let node_last_move = null;

        // node taken
        const drag = (ev) => {
            if (ev.type === "touchstart") {
                console.log("drag", ev)
                node_move_select = ev.target.closest(".nodes-list").getAttribute('node-item');
            } else {
                ev.dataTransfer.setData("node", ev.target.getAttribute('node-item'));
            }
        }
        
        const allowDrop = (ev) => {
            ev.preventDefault();
        }
        
        // node dropped
        const drop = (ev) => {
            if (ev.type === "touchend") {
                console.log("drop", ev)
                let parentdrawflow = document.elementFromPoint(node_last_move.touches[0].clientX, node_last_move.touches[0].clientY).closest("#drawflow");
                if(parentdrawflow != null) {
                addNodeToDrawFlow(node_move_select, node_last_move.touches[0].clientX, node_last_move.touches[0].clientY);
            }
            } else {
                ev.preventDefault();
                let data = ev.dataTransfer.getData("node"); 
                addNodeToDrawFlow(data, ev.clientX, ev.clientY); //node name, x pos, y pos
            }
        }

        // drop node into drarflow editor
        const addNodeToDrawFlow = (name, pos_x, pos_y) => {
            pos_x = pos_x * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().x 
            * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)));
            pos_y = pos_y * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().y 
            * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)));
            
            // adding node to drawflow
            const nodeSelected = nodesList.find(object => object.item == name); 
            editor.value.addNode(name, nodeSelected.input,  nodeSelected.output, pos_x, pos_y, name, {}, name, 'vue'); 
        }

        onMounted(() => {            
            const id = document.getElementById("drawflow");
            editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
            editor.value.start();
            
            let num1 = 0
            let num2 = 0
            let total = 0

            // registering nodes on the editor
            editor.value.registerNode('number', <NodeNumber />, {}, {});
            editor.value.registerNode('addition', <NodeOperation title='Addition' />, {}, {}); 
            editor.value.registerNode('subtraction', <NodeOperation title='Subtraction' />, {}, {}); 
            editor.value.registerNode('multiplication', <NodeOperation title='Multiplication' />, {}, {}); 
            editor.value.registerNode('division', <NodeOperation title='Division' />, {}, {});
            editor.value.registerNode('assign', <NodeAssign />, {}, {});
            editor.value.registerNode('if', <NodeIf title='If statement'/>, {}, {});
            editor.value.registerNode('for', <NodeFor title='For statement'/>, {}, {});
            editor.value.registerNode('nodeCondition', <NodeCondition />, {}, {});

            editor.value.on('nodeDataChanged', (data) => {
                const nodeData = editor.value.getNodeFromId(data)
                const outputNode = nodeData.outputs.output_1.connections
               
                if(outputNode.length > 0) {
                    const outputNumber = parseInt(nodeData.data.number)
                    const nodeDataOuput = nodeData.outputs.output_1.connections[0].output;
                    const inputNodeId = nodeData.outputs.output_1.connections[0].node;
                    const inputNodeData = editor.value.getNodeFromId(inputNodeId)
                    const inputNodeName = inputNodeData.name;
                    const outputTotal = parseInt(inputNodeData.data.result)

                   
                    if(inputNodeName === 'subtraction' || inputNodeName === 'addition' || inputNodeName === 'multiplication' || inputNodeName === 'division') {
                        total = outputTotal
                        const objectOperation = {
                            assign: total 
                        }

                        const nodeConditionData = editor.value.getNodeFromId(outputNode[0].node)
                        const nodeConditionOutputs = nodeConditionData.outputs.output_1.connections
                        if(nodeConditionOutputs.length > 0){
                            const operationValue = editor.value
                            const node_id = nodeConditionData.outputs.output_1.connections[0].node
                            operationValue.updateNodeDataFromId(node_id, objectOperation)
                        }
                    }

                    if(inputNodeName !== 'assign' ){
                        if(nodeDataOuput == 'input_1'){              
                            num1 = outputNumber
                        }
                        else if(nodeDataOuput == 'input_2'){
                            num2 = outputNumber
                        }

                        let result = operationValues(num1, num2, inputNodeName)
                        const objectOperation = {
                            result: result
                        }
                    
                        const operationValue = editor.value
                        const input_id = inputNodeData.id
                        operationValue.updateNodeDataFromId(input_id, objectOperation)
                    } 
                     
     
                    if(inputNodeName === 'nodeCondition' && nodeData.name == 'if') {
                        const conditionResult = validateIf(parseInt(nodeData.data.num1), parseInt(nodeData.data.num2), nodeData.data.option);
                        const objectOperation = {
                            assign: conditionResult
                        }
                        const operationValue = editor.value
                        const input_id = inputNodeData.id
                        operationValue.updateNodeDataFromId(input_id, objectOperation)
                    }

                    if(inputNodeName === 'nodeCondition' && nodeData.name === 'for') {
                        const conditionResult = validateFor(parseInt(nodeData.data.num1), parseInt(nodeData.data.num2));
                        const objectOperation = {
                            assign: conditionResult
                        }
                        const operationValue = editor.value
                        const input_id = inputNodeData.id
                        operationValue.updateNodeDataFromId(input_id, objectOperation)
                    }
                }

            })     

            editor.value.on('connectionCreated', (data) => {
                const output = editor.value.getNodeFromId(data.output_id)
                // console.log("output number", output)
                const outputNumber = parseInt(output.data.number);      
                const nodeDataOuput = output.outputs.output_1.connections[0].output;
                const outputTotal = parseInt(output.data.result)
                  
                const inputData = editor.value.getNodeFromId(data.input_id)
                const nodeName = inputData.name;
                const conditionName = output.name;
          
                if(nodeName !== 'assign'){
                    if(nodeDataOuput == 'input_1'){              
                        num1 = outputNumber
                    }
                    else if(nodeDataOuput == 'input_2'){
                        num2 = outputNumber
                    }

                    let result = operationValues(num1, num2, nodeName)
                    const objectOperation = {
                        result: result
                    }
                  
                    const operationValue = editor.value
                    const input_id = editor.value.getNodeFromId(data.input_id).id
                    operationValue.updateNodeDataFromId(input_id, objectOperation)
                } else {
                    total = outputTotal

                    const objectOperation = {
                        assign: total
                    }
                    const operationValue = editor.value
                    const input_id = editor.value.getNodeFromId(data.input_id).id
                    operationValue.updateNodeDataFromId(input_id, objectOperation)
                }
                
                if(nodeName === 'nodeCondition' && conditionName === 'if') {
                    const conditionResult = validateIf(parseInt(output.data.num1), parseInt(output.data.num2), output.data.option);
                    const objectOperation = {
                        assign: conditionResult
                    }
                    const operationValue = editor.value
                    const input_id = editor.value.getNodeFromId(data.input_id).id
                    operationValue.updateNodeDataFromId(input_id, objectOperation)
                }

                if(nodeName === 'nodeCondition' && conditionName === 'for') {
                    const conditionResult = validateFor(parseInt(output.data.num1), parseInt(output.data.num2));
                    const objectOperation = {
                        assign: conditionResult
                    }
                    const operationValue = editor.value
                    const input_id = editor.value.getNodeFromId(data.input_id).id
                    operationValue.updateNodeDataFromId(input_id, objectOperation)
                }
            })
        })        

        function operationValues(num1, num2, nodeName) {
            let result = 0;
            switch (nodeName) {
                case 'addition':
                    result = num1 + num2; 
                    break;
                case 'subtraction':
                    result = num1 - num2;
                    break;
                case 'multiplication':
                    result = num1 * num2;
                    break;
                case 'division':
                    result = num1 / num2;
                    break;
                default:
                    console.log('No name')
            }
            return result;
        }

        function validateIf(num1, num2, nodeName) {
            let result = false;
            switch (nodeName) {
                case 'less':
                    if(num1 < num2) {
                        result = true
                    } else {
                        result = false;
                    }
                    break;
                case 'greater':
                    if(num1 > num2) {
                        result = true
                    } else {
                        result = false;
                    }
                    break;
                case 'lessEqual':
                    if(num1 <= num2) {
                        result = true
                    } else {
                        result = false;
                    }
                    break;
                case 'greaterEqual':
                    if(num1 >= num2) {
                        result = true
                    } else {
                        result = false;
                    }
                    break;
                case 'equal':
                    if(num1 == num2) {
                        result = true
                    } else {
                        result = false;
                    }
                    break;
                default:
                    console.log('No name')
            }
            return result;
        }

        function validateFor(num1, num2) {
            let result = 0;
            let message = '';
            
            while (num1 < num2) {
                num1++;
                result++;
            }
            console.log("res", result)
            message = `Ciclos ${result}`;
            return message;
        }
              
        return {
            nodesList, drag, drop, allowDrop,
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