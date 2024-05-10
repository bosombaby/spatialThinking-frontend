<template>
  <div class="flex flex-col gap-y-5">
    <div class="top-header ty-card bg-indigo-100">
      <div class="flex justify-between items-center">
        <div class="text-lg font-bold">
          {{ levelObj.level_name + " | " }}
          <span class="text-sm font-normal">
            {{ levelObj.description }}
          </span>
        </div>
        <div class="flex items-center">
          <div class="text-sm">剩余时间：</div>
          <div class="text-sm font-bold">00:00:00</div>
          <div class="text-sm ml-2">勋章</div>
        </div>
      </div>
    </div>
    <div class="question-list ty-card bg-indigo-100 flex-1">
      <ul>
        <li v-for="(item, index) in levelObj.question_list" :key="item.id">
          <div>{{ index + 1 + ". " }} {{ item.content }}</div>
          <el-radio-group v-model="result" class="flex flex-col justify-start">
            <el-radio value="A" size="large">{{ item.option_a }}</el-radio>
            <el-radio value="B" size="large">{{ item.option_b }}</el-radio>
            <el-radio value="C" size="large">{{ item.option_c }}</el-radio>
            <el-radio value="D" size="large">{{ item.option_d }}</el-radio>
          </el-radio-group>
        </li>
      </ul>
    </div>
    <div class="flex justify-end ty-card bg-indigo-100">
      <el-button plain>暂存</el-button>
      <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getQuestionList } from "@/api/level";
defineOptions({
  name: "Beginner"
});

const result = ref();

let levelObj = ref({});
const getQuestionData = async () => {
  const params = {
    level_id: 1,
    subject_id: 1
  };
  const res = await getQuestionList(params);
  levelObj.value = res.data;
};

getQuestionData();
</script>

<style lang="scss" scoped></style>
