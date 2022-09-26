<template>
    <div className="python-container flex bg-white text-black w-1/4 mr-3">
        <div className="">
            <div className="flex">
                <img 
                    className="w-8"
                    src='../assets/python.jpg' 
                    alt=""
                >
                <h3 className="text-gray-600 ml-2">
                    Python code
                </h3>
            </div>

            <div className="text-gray-600 p-4">
                <p>{{this.$store.state.jsToPython.num1}}</p>
                <p>{{this.$store.state.jsToPython.num2}}</p>
                <p>{{this.$store.state.jsToPython.operation}}</p>
                <p>{{this.$store.state.jsToPython.variable}}</p>
                <p>{{this.$store.state.jsToPython.console}}</p>
                <p>{{this.$store.state.jsToPython.condition}}</p>
                <p>&nbsp;{{this.$store.state.jsToPython.do}}</p>
                <p>&nbsp;{{this.$store.state.jsToPython.true}}</p>
                <p>{{this.$store.state.jsToPython.else}}</p>
                <p>&nbsp;{{this.$store.state.jsToPython.false}}</p>
            </div>
            <div className="w-full bg-black h-[190px] border-2 border-gray-300">
                <div className="flex bg-sky-600 h-5 border-[1px] border-gray-300">
                    <img className="w-5" src="../assets/terminal.png" alt="">
                    <h3 className="text-black text-xs">Python.exe</h3>
                </div>
                <div className="text-sm text-green-600 h-[160px] overflow-y-scroll">
                    <p className="text-sm mt-4 mb-2">{{this.$store.state.jsToPythonCount.loop}}</p>
                    <div v-for="i in this.$store.state.jsToPythonBucle" :key="i.number">
                        <p>{{i.variable }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PythonCode',
    }
</script>

<style scoped>
    @media only screen and (min-width: 350px) {
        .python-container {
            display: none
        }
    }

    @media only screen and (min-width: 900px) {
        .python-container {
            display: inline
        }
    }
</style>
