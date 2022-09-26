<template>
    <h2 id="node-title" className="text-sm">{{ title }}</h2>
    <p className="text-xs">For</p>
    <div className="w-64 space-between">
        <input className="w-10 mr-2 h-7 text-sm" type="number" placeholder="Start" df-num1>           
        <input className="w-10 ml-2 h-7 text-sm" type="number" placeholder="Finish" df-num2>
    </div>
</template>

<script>
     export default {
        name: 'NodeFor',
        props: {
            title: String
        },
    }
</script>