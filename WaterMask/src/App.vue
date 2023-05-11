<script setup>
import WaterMask from "./waterMask.vue";
</script>

<template>
  <div class="main">
    <h1>水印</h1>
    <WaterMask>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
        facere rem blanditiis voluptas, dolor natus. Perspiciatis deleniti,
        assumenda ducimus, laboriosam consectetur reiciendis voluptas
        reprehenderit, facilis deserunt quibusdam ipsum voluptatem cumque. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Delectus impedit
        expedita harum dolor! Odit dolorem magni iste. Earum, odit autem, saepe
        nemo dolorum rerum voluptatem voluptate fugit error unde molestiae?
      </p>
    </WaterMask>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  font-size: 26px;
}
</style>
