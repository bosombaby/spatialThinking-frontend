<template>
  <div>
    <ul class="flex flex-wrap gap-12 justify-between pl-4">
      <li
        class="flex flex-col p-4 h-[14rem] bg-slate-200"
        v-for="flag in flagData"
        :key="flag.nation_id"
      >
        <div class="w-[15rem] h-[10rem]">
          <el-image
            :fit="cover"
            :src="flag.online_link"
            :alt="flag.nation_name"
            style="width: 100%; height: 100%"
          />
        </div>
        <div class="flex-bc mt-2">
          <span>{{ flag.nation_name + "国旗" }}</span>
          <el-button type="primary" @click="goDetail(flag.nation_id)"
            >查看</el-button
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { flagData } from "../config";
import { getNationFlag } from "@/api/geo";
import { useRouter } from "vue-router";

const router = useRouter();
defineOptions({
  name: "NationalFlag"
});

const flagData = ref([]);
const getFlagData = async () => {
  const res = await getNationFlag();
  flagData.value = res.data.nation_list;
};

getFlagData();
const goDetail = id => {
  router.push({ name: "NationalFlagDetail", query: { id } });
};
</script>

<style lang="scss" scoped></style>
