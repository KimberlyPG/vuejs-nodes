<template>
    <title></title>
    <!-- {{ num1 }} -->
    <input type="number" disabled df-result />
</template>

<script>
    import { getCurrentInstance} from 'vue'

    export default {
        name: 'NodeOperation',
        props: {
            num1: Number,
            // num2: Number
        },        
    }
</script>