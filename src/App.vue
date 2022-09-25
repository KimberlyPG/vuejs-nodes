<template>
  <h1 className="flex justify-center text-2xl text-bold text-white bg-blue-500 my-5">Drawflow</h1>
  <div className="flex">
    <DrawflowDashboard />
  </div>
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
