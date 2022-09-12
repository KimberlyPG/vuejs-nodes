<template>
    <div class="h-[700px] w-full">
        <div class="nodes-list w-40" draggable="true" v-for="i in nodesList" :key="i" :node-item="i.item" @dragstart="drag($event)">
            <span class="node bg-pink-200">{{ i.name }}</span>
        </div>

        <div class="pt-2 h-4/5 w-full">
            <div id="drawflow" @drop="drop($event)" @dragover="allowDrop($event)"></div>
        </div>
    </div>
</template>

<script>
    import Drawflow from 'drawflow'
    // eslint-disable-next-line no-unused-vars
    import styleDrawflow from 'drawflow/dist/drawflow.min.css'
    import { h, getCurrentInstance, render, readonly, onMounted, shallowRef } from 'vue'
    import NodeNumber from './Node-number.vue'
    import NodeOperation from './Node-operation.vue'
    // import { useStore } from 'vuex'

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
                    output:0,
                },
                {
                    name: 'Subtraction',
                    item: 'subtraction',
                    input:2,
                    output:0,
                },
                {
                    name: 'Multiplication',
                    item: 'multiplication',
                    input:2,
                    output:0,
                },
                {
                    name: 'Division',
                    item: 'division',
                    input:2,
                    output:0,
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
            // registering nodes to the editor
            editor.value.registerNode('number', <NodeNumber />, {}, {});
            editor.value.registerNode('addition', <NodeOperation title='addition' />, {}, {}); 
            editor.value.registerNode('subtraction', <NodeOperation title='subtraction' />, {}, {}); 
            editor.value.registerNode('multiplication', <NodeOperation title='multiplication' />, {}, {}); 
            editor.value.registerNode('division', <NodeOperation title='division' />, {}, {});

            editor.value.on('connectionCreated', (data) => {
                // const output_id = editor.value.getNodeFromId(data.output_id).id
                const output = editor.value.getNodeFromId(data.output_id)
                console.log("output", output)

                
                // const outputNodeId = output.id;
                const outputNumber = parseInt(output.data.number);
                
                const output_input = output.outputs.output_1.connections[0].output;
                
                const inputData = editor.value.getNodeFromId(data.input_id)
                console.log("inputData", inputData)

                const nodeName = inputData.name;
                console.log("name", nodeName);

                // let inputNode1 = 0
                // let inputNode2 = 0
                // if(inputData.inputs.input_1.connections[0] !== undefined) {
                //     inputNode1 = inputData.inputs.input_1.connections[0].node
                // }

                // if(inputData.inputs.input_2.connections[0] !== undefined) {
                //     inputNode2 = inputData.inputs.input_2.connections[0].node
                // }

                if(output_input == 'input_1'){
                    // if(inputData.data.inputNode1 == inputData.inputs.input_1.connections[0].node || inputData.id <= 3) {
                        // num2 = 0
                        num1 = outputNumber
                    // } 
                }
                else if(output_input == 'input_2'){
                    // if(inputData.data.inputNode2 == inputData.inputs.input_2.connections[0].node || inputData.id <= 3) {
                        // num1 = 0
                        num2 = outputNumber
                    // }
                }

                let result = operationValues(num1, num2, nodeName)
                // operationValues(num1, num2);
                const objectOperation = {
                    result: result
                }

                const operationValue = editor.value

                const input_id = editor.value.getNodeFromId(data.input_id).id
                operationValue.updateNodeDataFromId(input_id, objectOperation)
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
    
        return {
            nodesList, drag, drop, allowDrop,
        }
    }
}
</script>

<style scoped>
    .node {
        background-color: aliceblue;
        color:#494949;
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
      background: #dfa4e7;
      background-size: 20px 20px;
      background-image: radial-gradient(#494949 1px, transparent 1px);      
    }
    </style>