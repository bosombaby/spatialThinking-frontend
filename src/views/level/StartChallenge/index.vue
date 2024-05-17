<template>
  <div class="flex flex-col gap-y-5" v-if="Object.keys(levelObj).length">
    <div class="ty-card bg-indigo-100">
      <div class="flex justify-between items-center">
        <!-- 左侧标题 -->
        <div class="text-lg font-bold">
          {{ levelObj.level_name + " | " }}
          <span class="text-sm font-normal">
            {{ levelObj.description }}
          </span>
        </div>
        <!-- 计时专区 -->
        <div class="text-base font-bold">
          <span>剩余时间：</span>
          <span class="text-red-500">00:00:00</span>
        </div>
        <!-- 右侧结果 -->
        <div class="flex items-center gap-x-2">
          <div class="text-sm text-red-500">
            历史得分：{{ levelObj.record_list.score }}
          </div>
        </div>
      </div>
    </div>
    <ul class="question-list ty-card bg-indigo-100 flex-1">
      <li
        v-for="(item, index) in levelObj.question_list"
        :key="item.id"
        class="mb-4"
      >
        <!-- 题目内容 -->
        <div>
          {{ index + 1 + ". " }}
          {{ item.content }}
        </div>
        <div class="flex items-center gap-x-3">
          <el-radio-group v-model="userAnswerList[index]" class="flex flex-col">
            <el-radio value="A" size="large">
              {{ item.option_a }}
            </el-radio>
            <el-radio value="B" size="large">{{ item.option_b }}</el-radio>
            <el-radio value="C" size="large" v-if="item.option_c">{{
              item.option_c
            }}</el-radio>
            <el-radio value="D" size="large" v-if="item.option_d">{{
              item.option_d
            }}</el-radio>
          </el-radio-group>
        </div>
      </li>
    </ul>
    <div class="flex justify-center ty-card bg-indigo-100">
      <el-button plain @click="setUserAnswer">暂存</el-button>
      <el-button type="primary" @click="sumbitAnswer">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { createLevelRecord } from "@/api/level";
import { useUserStoreHook } from "@/store/modules/user";

const userAnswerList = ref([]);
const officeAnswerList = ref([]);
const userStore = useUserStoreHook();
const props = defineProps({
  levelObj: {
    type: Object,
    default: () => ({})
  },
  level_id: {
    type: Number,
    default: 1
  }
});

const emits = defineEmits(["update:isReChallenge", "getQuestionData"]);

// 暂存答案
const userAnswerStore = `user-answer-${props.level_id}`;
const setUserAnswer = () => {
  localStorage.setItem(userAnswerStore, JSON.stringify(userAnswerList.value));
};

const getUserAnswer = () => {
  const userAnswer = localStorage.getItem(userAnswerStore);
  userAnswerList.value = JSON.parse(userAnswer);
};
getUserAnswer();

// 生成正确答案列表
const getOfficeAnswerList = () => {
  const list = [];
  props.levelObj.question_list.forEach(item => {
    list.push(item.answer);
  });

  officeAnswerList.value = list;
};

// 判断是否所有选项都勾选
const isAllChecked = () => {
  return (
    userAnswerList.value.filter(item => item).length ===
    officeAnswerList.value.length
  );
};

// 计算当前试卷得分
const calculateScore = () => {
  let score = 0;
  userAnswerList.value.forEach((item, index) => {
    if (item === officeAnswerList.value[index]) {
      score += 10;
    }
  });
  return score;
};

// 提交答卷
const sumbitAnswer = async () => {
  getOfficeAnswerList();
  if (!isAllChecked()) {
    ElMessage.error("请完成所有题目后再提交");
    return;
  }

  const score = calculateScore();
  const params = {
    user_id: userStore.id,
    level_id: props.level_id,
    result: "已完成",
    answer: userAnswerList.value.join(","),
    score: score
  };
  const res = await createLevelRecord(params);
  ElMessage.success(res.msg);

  userAnswerList.value = [];
  setUserAnswer();
  emits("getQuestionData");
  emits("update:isReChallenge", false);
};
</script>

<style lang="scss" scoped>
:deep(.el-radio-group) {
  align-items: flex-start;
}
</style>
