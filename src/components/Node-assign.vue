<template>
    <h2 className="text-sm">Assign</h2>
    <input class="w-full text-sm" type="text" placeholder df-variable="Add a name">
    <input class="w-full text-xs" type="text" disabled df-assign>
</template>

<script>
    export default {
        name: 'NodeAssign'    
    }
</script>