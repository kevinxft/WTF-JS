<script setup>
import Heavy from "./components/heavy.vue";
import { useDefer } from "./useDefer";
const defer = useDefer();
</script>

<template>
  <div class="container">
    <div v-for="n in 100">
      <Heavy v-if="defer(n)"></Heavy>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr, 1fr);
  grid-gap: 20px;
}
</style>
