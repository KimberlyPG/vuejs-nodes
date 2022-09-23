<template>
    <div>
        <p className="text-sm">Number</p>
        <input class="number-class w-full" type="number" df-number />
    </div>
</template>

<script> 
    // import { getCurrentInstance, onMounted, ref } from 'vue
    export default {
        name: 'NodeNumber',
        // data: () => {
        //     return {
        //         amount: 0

        //     }
        // },
        // setup() {
        //     const nodeId = ref(0);
     
        //     let df = getCurrentInstance().appContext.config.globalProperties.$df;
        //     console.log("$df", getCurrentInstance().appContext.config.globalProperties.$df)
                    
        //     console.log(df.nodeId)
        //     onMounted(() => {
        //         nodeId.value = df.nodeId
        //         console.log(nodeId.value)
        //     });
            
        //     return {
        //         df, nodeId
        //     }
        // }        
    }
    DataTransfer
</script>

