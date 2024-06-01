<template>
  <div>
    <el-descriptions title="个人信息" :column="3" border>
      <el-descriptions-item label="用户名">{{
        userStore.userInfo.username
      }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{
        userStore.userInfo.profile.nickname
      }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{
        userStore.userInfo.email
      }}</el-descriptions-item>
      <el-descriptions-item label="后台登录时间">{{
        userStore.userInfo.last_login
      }}</el-descriptions-item>
      <el-descriptions-item label="金币数目">
        {{ userStore.userInfo.profile.gold_count }}
      </el-descriptions-item>
      <el-descriptions-item label="积分数目">
        {{ userStore.userInfo.profile.points }}
      </el-descriptions-item>
      <el-descriptions-item label="会员等级">
        {{ userStore.userInfo.profile.membership_level }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { useUserStoreHook } from "@/store/modules/user";
const userStore = useUserStoreHook();

defineOptions({
  name: "MyInformation"
});

// TODO:问题排查

// 获取用户信息
userStore.getUserInfo();
</script>

<style lang="scss" scoped></style>
