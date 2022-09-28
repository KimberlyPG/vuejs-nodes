<template>
    <div className="python-container flex bg-white text-black w-1/4 mr-3">
        <button className="w-16 text-sm text-gray-500 hover:bg-yellow-400 focus:bg-yellow-400 rounded-sm" @click="toggle = 'python'">Python</button>
        <button className="w-16 text-sm text-gray-500 hover:bg-red-400 focus:bg-red-400 rounded-sm" @click="toggle = 'java'">Java</button>
        <button className="w-16 text-sm text-gray-500 hover:bg-blue-400 focus:bg-blue-400 rounded-sm" @click="toggle = 'cPlus'">C++</button>
        <div v-if="toggle === 'cPlus'">
            <div className="flex p-3">
                <img 
                    className="w-8"
                    src='../assets/c++.png' 
                    alt="c++ image"
                >
                <h3 className="text-gray-600 ml-2">C++ code</h3>
            </div>
            <div className="text-gray-600 p-4 h-52 text-base">
                <ul>
                    <li v-for="(value, prop) in this.$store.getters.jsToCplusData" :key="value">
                        <p v-if= "prop === 'true' || prop === 'false' || prop === 'do'">&nbsp;&nbsp;&nbsp;{{value}}</p>
                        <p v-else-if="prop!=='console'">{{ value }}</p>          
                    </li>
                </ul>
            </div>
            <div className="w-full bg-black h-[190px] border-2 border-gray-300">
                <div className="flex bg-sky-600 h-5 border-[1px] border-gray-300">
                    <img className="w-5" src="../assets/terminal.png" alt="">
                    <h3 className="text-black text-xs">C++.exe</h3>
                </div>
                <div className="text-sm text-green-600 h-[160px] overflow-y-scroll">
                    <p>{{this.$store.getters.jsToCplusData.console}}</p>
                    <p>{{this.$store.getters.jsToCplusData.consoleResult}}</p>
                    <div v-for="i in this.$store.getters.jsToPythonBucleData" :key="i.number">
                        <p>{{i.number +" "+i.variable }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="toggle == 'java'">
            <div className="flex p-3">
                <img 
                    className="w-8"
                    src='../assets/java.png' 
                    alt="java image"
                >
                <h3 className="text-gray-600 ml-2">Java code</h3>
            </div>
            <div className="text-gray-600 p-4 h-52 text-base">
                <ul>
                    <li v-for="(value, prop) in this.$store.getters.jsToJavaData" :key="value">
                        <p v-if= "prop === 'true' || prop === 'false' || prop === 'do'">&nbsp;&nbsp;&nbsp;{{value}}</p>
                        <p v-else>{{ value }}</p>          
                    </li>
                </ul>
            </div>
            <div className="w-full bg-black h-[190px] border-2 border-gray-300">
                <div className="flex bg-sky-600 h-5 border-[1px] border-gray-300">
                    <img className="w-5" src="../assets/terminal.png" alt="">
                    <h3 className="text-black text-xs">Java.exe</h3>
                </div>
                <div className="text-sm text-green-600 h-[160px] overflow-y-scroll">
                    <p>{{this.$store.getters.jsToJavaData.console}}</p>
                    <p>{{this.$store.getters.jsToJavaData.consoleResult}}</p>
                    <div v-for="i in this.$store.getters.jsToPythonBucleData" :key="i.number">
                        <p>{{i.number +" "+i.variable }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="toggle == 'python'">
            <div className="flex p-3">
                <img 
                    className="w-8"
                    src='../assets/python.jpg' 
                    alt="python image"
                >
                <h3 className="text-gray-600 ml-2">Python code</h3>
            </div>
            <div className="text-gray-600 p-4 h-52 text-base">
                <ul>
                    <li v-for="(value, prop) in this.$store.getters.jsToPythonData" :key="value">
                        <p v-if= "prop === 'true' || prop === 'false' || prop === 'do'">&nbsp;&nbsp;&nbsp;{{value}}</p>
                        <p v-else>{{ value }}</p>          
                    </li>
                </ul>
            </div>
            <div className="w-full bg-black h-[190px] border-2 border-gray-300">
                <div className="flex bg-sky-600 h-5 border-[1px] border-gray-300">
                    <img className="w-5" src="../assets/terminal.png" alt="">
                    <h3 className="text-black text-xs">Python.exe</h3>
                </div>
                <div className="text-sm text-green-600 h-[160px] overflow-y-scroll">
                    <p>{{this.$store.getters.jsToPythonData.console}}</p>
                    <p>{{this.$store.getters.jsToPythonData.loop}}</p>
                    <div v-for="i in this.$store.getters.jsToPythonBucleData" :key="i.number">
                        <p>{{i.number +" "+i.variable }}</p>
                    </div>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
    export default {
        name: 'LanguagesCode',
        data () {
            return {
                toggle: 'python'
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
