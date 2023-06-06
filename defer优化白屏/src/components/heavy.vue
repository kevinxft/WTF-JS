<script setup>
import { reactive, computed } from "vue";
const list = reactive(Array.from({ length: 6000 }, (_, index) => index));

const colors = ["#C4DFDF", "#FDCEDF", "#FDCEDF", "#AEE2FF", "#FFB84C"];

const color = computed(() => {
  const index = Math.ceil(Math.random() * 10) % 5;
  return colors[index];
});
</script>

<template>
  <div class="main">
    <div class="item" v-for="(item, index) in list" :key="index"></div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.item {
  height: 10px;
  width: 10px;
  background: v-bind(color);
}
</style>
