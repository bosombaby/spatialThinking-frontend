<template>
  <div class="text-center">
    <el-image :src="badge.online_link" class="w-1/3 h-1/3" />
    <div class="text-lg font-bold text-red-500">{{ badge.name }}勋章</div>
  </div>
</template>

<script setup>
defineProps({
  badge: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
