<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="record_id" label="ID" width="180" align="center" />
      <el-table-column
        prop="level_name"
        label="关卡名称"
        width="180"
        align="center"
      />
      <el-table-column
        prop="start_time"
        label="开始时间"
        width="180"
        align="center"
      />
      <el-table-column
        prop="end_time"
        label="结束时间"
        width="180"
        align="center"
      />
      <el-table-column prop="result" label="结果" width="180" align="center" />
      <el-table-column prop="score" label="分数" width="180" align="center" />
      <el-table-column prop="answer" label="答案" width="180" align="center" />
      <el-table-column
        prop="gold_count"
        label="金币数"
        width="180"
        align="center"
      />
      <el-table-column
        prop="points"
        label="积分数"
        width="180"
        align="center"
      />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getLevelRecord } from "@/api/level";
import { useUserStoreHook } from "@/store/modules/user";

const tableData = ref([]);
const userStore = useUserStoreHook();

defineOptions({
  name: "ChallengeRecord"
});

const getLevelRecordData = async () => {
  const params = {
    user_id: userStore.id
  };
  const res = await getLevelRecord(params);
  tableData.value = res.data.record_list;
};

getLevelRecordData();
</script>

<style lang="scss" scoped></style>
