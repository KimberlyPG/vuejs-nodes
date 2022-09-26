<template>
    <div className="python-container flex bg-white text-black w-1/4">
        <div className="">
            <div className="flex">
                <img 
                    className="w-10"
                    src='../assets/python.jpg' 
                    alt=""
                >
                <h3 className="text-gray-700">
                    Python code
                </h3>
            </div>

            <div className="text-gray-600">
                <p>{{this.$store.state.jsToPython.num1}}</p>
                <p>{{this.$store.state.jsToPython.num2}}</p>
                <p>{{this.$store.state.jsToPython.operation}}</p>
                <p>{{this.$store.state.jsToPython.variable}}</p>
                <p>{{this.$store.state.jsToPython.condition}}</p>
                <p className="ml-5">{{this.$store.state.jsToPython.true}}</p>
                <p>{{this.$store.state.jsToPython.else}}</p>
                <p className="ml-5">{{this.$store.state.jsToPython.false}}</p>
                <p className="ml-5">{{this.$store.state.jsToPython.result}}</p>
                <p className="text-sm mt-4 mb-2">{{this.$store.state.jsToPythonCount.loop}}</p>
                <div className="text-sm text-black h-52 overflow-y-scroll scrollbar-hide">
                    <div v-for="i in this.$store.state.jsToPythonBucle" :key="i.number">
                        <p>{{ i.number + " "+ i.variable }}</p>
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
