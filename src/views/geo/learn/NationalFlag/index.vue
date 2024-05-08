<template>
  <div>
    <ul id="flex">
      <li
        class="flex flex-col gap-y-2 justify-between w-[18rem] h-[15rem] ty-card"
      >
        <div id="flag-show" class="w-full flex-">
          <img
            src="@/assets/flag/1024.png"
            alt="中国国旗"
            class="w-full h-full"
          />
        </div>
        <div class="flex-bc">
          <span>中国国旗</span>
          <el-button type="primary" @click="goDetail">查看</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
defineOptions({
  name: "NationalFlag"
});

const goDetail = () => {
  router.push({ name: "NationalFlagDetail" });
};
</script>

<style lang="scss" scoped></style>
