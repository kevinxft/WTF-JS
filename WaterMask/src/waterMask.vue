<template>
  <div class="water-mask" ref="parentRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { watchEffect, ref, onMounted, onUnmounted } from "vue";
import { useMaskBg } from "./useMaskBg.js";

const props = defineProps({
  text: {
    type: String,
    default: "KEVIN",
  },
  fontSize: {
    type: Number,
    default: 40,
  },
  gap: {
    type: Number,
    default: 80,
  },
});
const bg = useMaskBg(props);
const parentRef = ref(null);
const flag = ref(0);
let ob;
let mask;
watchEffect(() => {
  flag.value;
  if (!parentRef.value) return;
  if (mask) {
    mask.remove();
  }
  const { base64, styleSize } = bg.value;
  console.log(base64);
  mask = document.createElement("div");
  mask.style.backgroundImage = `url(${base64})`;
  mask.style.backgroundSize = `${styleSize} px ${styleSize}px`;
  mask.style.backgroundRepeat = "repeat";
  mask.style.zIndex = 9999;
  mask.style.position = "absolute";
  mask.style.inset = "0";
  parentRef.value.appendChild(mask);
});

onMounted(() => {
  ob = new MutationObserver((records) => {
    for (const record of records) {
      // 删除
      for (const dom of record.removedNodes) {
        if (dom === mask) {
          flag.value++;
          console.log("被删除了，重新生成水印");
        }
      }
      // 修改
      if (record.target === mask) {
        flag.value++;
        console.log("被修改了，重新生成水印");
      }
    }
  });
  ob.observe(parentRef.value, {
    attributes: true,
    childList: true,
    subtree: true,
  });

  parentRef.value.oncopy = (evt) => {
    evt.preventDefault();
    console.log("😑，不给复制");
  };
});

onUnmounted(() => {
  ob && ob.disconnect();
  mask = null;
});
</script>

<style>
.water-mask {
  z-index: 0;
  width: 500px;
  height: 500px;
  position: relative;
  user-select: none;
}
</style>
