<template>
    <title>{{ title }}</title>
    <input class="w-full" type="number" disabled df-result />
</template>

<script>

    export default {
        name: 'NodeOperation',
        prop: {
            title: String
        }
    }
</script>