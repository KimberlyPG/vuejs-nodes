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
                <p>{{this.$store.jsToJavaData.num1}}</p>
                <p>{{this.$store.jsToJavaData.num2}}</p>
                <p>{{this.$store.jsToJavaData.operation}}</p>
                <p>{{this.$store.jsToJavaData.variable}}</p>
                <p>{{this.$store.jsToJavaData.condition}}</p>
                <p>&nbsp;&nbsp;&nbsp;{{this.$store.jsToJavaData.do}}</p>
                <p>{{this.$store.jsToJavaData.true}}</p>
                <p>{{this.$store.jsToJavaData.else}}</p>
                <p>{{this.$store.jsToJavaData.false}}</p>
                <p>{{this.$store.jsToJavaData.close}}</p>
            </div>
            <div className="w-full bg-black h-[190px] border-2 border-gray-300">
                <div className="flex bg-sky-600 h-5 border-[1px] border-gray-300">
                    <img className="w-5" src="../assets/terminal.png" alt="">
                    <h3 className="text-black text-xs">Java.exe</h3>
                </div>
                <div className="text-sm text-green-600 h-[160px] overflow-y-scroll">
                    <p>{{this.$store.jsToJavaData.console}}</p>
                    <p className="text-sm mt-4 mb-2">{{this.$store.jsToJavaPrintlnData.consoleResult}}</p>
                    <div v-for="i in this.$store.jsToPythonBucleData" :key="i.number">
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
                <p>{{this.$store.jsToPythonData.num1}}</p>
                <p>{{this.$store.jsToPythonData.num2}}</p>
                <p>{{this.$store.jsToPythonData.operation}}</p>
                <p>{{this.$store.jsToPythonData.variable}}</p>
                <p>{{this.$store.jsToPythonData.condition}}</p>
                <p>&nbsp;{{this.$store.jsToPythonData.do}}</p>
                <p>&nbsp;{{this.$store.jsToPythonData.true}}</p>
                <p>{{this.$store.jsToPythonData.else}}</p>
                <p>&nbsp;{{this.$store.jsToPythonData.false}}</p>
            </div>
            <div className="w-full bg-black h-[190px] border-2 border-gray-300">
                <div className="flex bg-sky-600 h-5 border-[1px] border-gray-300">
                    <img className="w-5" src="../assets/terminal.png" alt="">
                    <h3 className="text-black text-xs">Python.exe</h3>
                </div>
                <div className="text-sm text-green-600 h-[160px] overflow-y-scroll">
                    <p>{{this.$store.jsToPythonData.console}}</p>
                    <p className="text-sm mt-4 mb-2">{{this.$store.jsToPythonCountData.loop}}</p>
                    <div v-for="i in this.$store.jsToPythonBucleData" :key="i.number">
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
