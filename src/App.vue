<template>
  <h1 className="flex justify-center  text-2xl text-bold text-white bg-blue-600 my-5">Drawflow</h1>
  <DrawflowDashboard />
</template>

<script setup>
  import DrawflowDashboard from './components/Drawflow-dashboard.vue'

// export default {
//   name: 'App',
// }
</script>

<style>
body {
   color: #cdcece;
   font-size: 20px;
   width: 100%;
   height: 100%;
   background: #111312;
}
</style>
