<template>
  <div class="text-center">
    <el-image :src="badge.online_link" class="w-1/3 h-1/3" />
    <div class="text-lg font-bold text-red-500">
      {{ badge.name }}勋章
      <span class="text-sky-400">{{ score >= 60 ? "获得" : "未获得" }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  badge: {
    type: Object,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
