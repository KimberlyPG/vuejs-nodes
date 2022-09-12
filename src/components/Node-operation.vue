<template>
    <title></title>
    <!-- {{ num1 }} -->
    <input class="w-full" type="number" disabled df-result />
</template>

<script>
    export default {
        name: 'NodeOperation',
        props: {
            num1: Number,
            // num2: Number
        },        
    }
</script>