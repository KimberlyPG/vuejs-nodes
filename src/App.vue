<template>
  <div className="flex border-2 my-5 justify-center">
    <img className="w-10 h-10" src="./assets/icon.png" alt="">
    <h1 className="text-2xl font-bold text-sky-600 ml-2">Drawflow</h1>
  </div>
    <DrawflowDashboard />
</template>

<script setup>
  import DrawflowDashboard from './components/Drawflow-dashboard.vue'
</script>

<style>
body {
   color: #cdcece;
   font-size: 20px;
   width: 100%;
   height: 100%;
   background: #e9e7e7;
}
</style>
