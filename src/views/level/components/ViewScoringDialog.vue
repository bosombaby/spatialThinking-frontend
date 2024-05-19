<template>
  <div class="">
    <div class="flex items-center">
      <span class="text-lg font-bold text-red-500 mr-5">
        {{ scoring.description }} - {{ scoring.level }}
      </span>
      <span>当前分数区间：{{ scoring.score_range }}</span>
    </div>
    <h2 class="text-base mt-3 mb-1 font-bold text-black">空间思维评价：</h2>
    <ul v-html="details"></ul>
  </div>
</template>

<script setup>
const props = defineProps({
  scoring: {
    type: Object,
    required: true
  }
});

// 根据细节计算评分标准
const details = props.scoring.details
  .split("\n")
  .map(item => `<li>${item}</li>`)
  .join("");

console.log(details);
</script>

<style lang="scss" scoped></style>
