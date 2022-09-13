<template>
    <div>
        <p className="text-sm">Number</p>
        <input class="number-class w-full" type="number" df-number @change="updateSelect" />
    </div>
</template>

<script>
    // import { getCurrentInstance, ref, onMounted } from 'vue'
    
    export default {
        name: 'NodeNumber',
        // data() {
        //     return {
        //         number: 0
        //     }
        // },

        // setup() {
        //     const nodeId = ref(0);
        //     // let df = null
        
        //     let df = getCurrentInstance().appContext.config.globalProperties.$df;
        //     console.log("$df", getCurrentInstance().appContext.config.globalProperties.$df)
                    
        //     onMounted(() => {
        //         nodeId.value = df.nodeId
        //     });
            
        //     return {
        //         df, nodeId
        //     }
        // }           
    }
</script>

