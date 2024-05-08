<template>
  <div>我的信息</div>
</template>

<script setup>
import { useUserStoreHook } from "@/store/modules/user";
const userStore = useUserStoreHook();

defineOptions({
  name: "MyInformation"
});

// 获取用户信息
userStore.getUserInfo();
</script>

<style lang="scss" scoped></style>
