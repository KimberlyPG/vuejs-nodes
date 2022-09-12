<template>
    {{ title }}
    <input class="w-full" type="number" disabled df-result />
</template>

<script>
    // import { getCurrentInstance, ref, onMounted } from 'vue'
    export default {
        name: 'NodeOperation',
        props: {
            title: String
        },

        // setup() {
        //     const nodeId = ref(0);
        //     let df = null
        
        //     df = getCurrentInstance().appContext.config.globalProperties.$df;
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