<template>
    <div className="python-container flex bg-white text-black w-1/4 mr-3">
        <button className="w-16 text-sm text-gray-500 hover:bg-yellow-400 focus:bg-yellow-400 rounded-sm" @click="toggle = true">Python</button>
        <button className="w-16 text-sm text-gray-500 hover:bg-red-400 focus:bg-red-400 rounded-sm" @click="toggle = false">Java</button>
        <div v-if="!toggle">
            <div className="flex p-3">
                <img 
                    className="w-8"
                    src='../assets/java.png' 
                    alt=""
                >
                <h3 className="text-gray-600 ml-2">Java code</h3>
            </div>
            <div className="text-gray-600 p-4 h-52 text-base">
                <p>{{this.$store.state.jsToJava.num1}}</p>
                <p>{{this.$store.state.jsToJava.num2}}</p>
                <p>{{this.$store.state.jsToJava.operation}}</p>
                <p>{{this.$store.state.jsToJava.variable}}</p>
                <p>{{this.$store.state.jsToJava.condition}}</p>
                <p>&nbsp;&nbsp;&nbsp;{{this.$store.state.jsToJava.do}}</p>
                <p>{{this.$store.state.jsToJava.true}}</p>
                <p>{{this.$store.state.jsToJava.else}}</p>
                <p>{{this.$store.state.jsToJava.false}}</p>
                <p>{{this.$store.state.jsToJava.close}}</p>
            </div>
            <div className="w-full bg-black h-[190px] border-2 border-gray-300">
                <div className="flex bg-sky-600 h-5 border-[1px] border-gray-300">
                    <img className="w-5" src="../assets/terminal.png" alt="">
                    <h3 className="text-black text-xs">Java.exe</h3>
                </div>
                <div className="text-sm text-green-600 h-[160px] overflow-y-scroll">
                    <p>{{this.$store.state.jsToJava.console}}</p>
                    <p className="text-sm mt-4 mb-2">{{this.$store.state.jsToJavaPrintln.consoleResult}}</p>
                    <div v-for="i in this.$store.state.jsToPythonBucle" :key="i.number">
                        <p>{{i.variable }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div className="flex p-3">
                <img 
                    className="w-8"
                    src='../assets/python.jpg' 
                    alt=""
                >
                <h3 className="text-gray-600 ml-2">Python code</h3>
            </div>
            <div className="text-gray-600 p-4 h-52 text-base">
                <p>{{this.$store.state.jsToPython.num1}}</p>
                <p>{{this.$store.state.jsToPython.num2}}</p>
                <p>{{this.$store.state.jsToPython.operation}}</p>
                <p>{{this.$store.state.jsToPython.variable}}</p>
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
                    <p>{{this.$store.state.jsToPython.console}}</p>
                    <p className="text-sm mt-4 mb-2">{{this.$store.state.jsToPythonCount.loop}}</p>
                    <div v-for="i in this.$store.state.jsToPythonBucle" :key="i.number">
                        <p>{{i.number + i.variable }}</p>
                    </div>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
    export default {
        name: 'PythonCode',
        data () {
            return {
                toggle: false
            }
        },
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
