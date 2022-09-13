<template>
    <h2 className="text-sm">{{ title }}</h2>
    <p className="text-xs">If else</p>
    <div className="w-64 space-between">
        <input className="w-10 mr-2 h-7" type="number" df-num1>
            <select df-option className="h-7" name="" id="">
                <option value="select">-</option>
                <option value="less">&lt;</option>
                <option value="greater">&gt;</option>
                <option value="lessEqual">&le;</option>
                <option value="greaterEqual">&ge;</option>
                <option value="equal">&#61;</option>
            </select>
        <input className="w-10 ml-2 h-7" type="number" df-num2>
    </div>
</template>

<script>
     export default {
        name: 'NodeIf',
        props: {
            title: String
        },
    }
</script>