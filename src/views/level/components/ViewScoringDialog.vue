<template>
  <div class="text-center flex flex-col gap-y-3">
    <div>当前分数区间：{{ scoring.score_range }}</div>
    <div class="text-lg font-bold text-red-500">
      {{ scoring.description }} - {{ scoring.level }}
    </div>
    <div v-html="scoring.details"></div>
  </div>
</template>

<script setup>
defineProps({
  scoring: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
