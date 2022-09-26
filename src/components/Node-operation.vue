<template>
    <h2 id="node-title" className="text-sm">{{ title }}</h2>
    <input class="w-full" type="number" disabled df-result />
</template>

<script>
    export default {
        name: 'NodeOperation',
        props: {
            title: String
        },
    }
</script>