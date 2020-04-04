<template>
  <div class="personalReport_time">
    <input type="date" :max="this.endTime" value="" v-model="startTime"/>
    <div></div>
    <input type="date" :min="startTime" :max="this.maxTime" v-model="endTime"/>
  </div>
</template>

<script>
    export default {
        name: "time"
    }
</script>

<style scoped>

</style>
