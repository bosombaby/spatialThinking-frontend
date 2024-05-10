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
    <ul class="question-list ty-card bg-indigo-100 flex-1">
      <li
        v-for="(item, index) in levelObj.question_list"
        :key="item.id"
        class="mb-4"
      >
        <div>{{ index + 1 + ". " }} {{ item.content }}</div>
        <el-radio-group v-model="userAnswerList[index]" class="flex flex-col">
          <el-radio value="A" size="large">{{ item.option_a }}</el-radio>
          <el-radio value="B" size="large">{{ item.option_b }}</el-radio>
          <el-radio value="C" size="large" v-if="item.option_c">{{
            item.option_c
          }}</el-radio>
          <el-radio value="D" size="large" v-if="item.option_d">{{
            item.option_d
          }}</el-radio>
        </el-radio-group>

        <!-- 显示正确答案和解析 -->
        <el-collapse>
          <el-collapse-item title="答案解析">
            <div>
              <div>正确答案：{{ officeAnswerList[index] }}</div>
              <div v-html="`${item.solution}`"></div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </li>
    </ul>
    <div class="flex justify-end ty-card bg-indigo-100">
      <el-button plain>暂存</el-button>
      <el-button type="primary" @click="sumbitAnswer">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { getCurrentRoute } from "@/hooks/useRouterState";
import { getQuestionList } from "@/api/level";
defineOptions({
  name: "Beginner"
});

// 获取当前关卡的id
const { fullPath } = getCurrentRoute();
const match = fullPath.match(/\d+$/);
const level_id = match ? parseInt(match[0]) + 1 : 1;

const userAnswerList = reactive([]);
const officeAnswerList = reactive([]);
const result = ref();

// 生成正确答案列表
const getOfficeAnswerList = () => {
  levelObj.value.question_list.forEach(item => {
    officeAnswerList.push(item.answer);
  });
};

let levelObj = ref({});

const getQuestionData = async () => {
  const params = {
    level_id
  };
  const res = await getQuestionList(params);
  levelObj.value = res.data;
  getOfficeAnswerList();
};

getQuestionData();

// 判断是否所有选项都勾选
const isAllChecked = () => {
  return userAnswerList.filter(item => item).length === officeAnswerList.length;
};

// 计算当前试卷得分
const calculateScore = () => {
  let score = 0;
  userAnswerList.forEach((item, index) => {
    if (item === officeAnswerList[index]) {
      score += 10;
    }
  });
  return score;
};

// 提交答卷
const sumbitAnswer = () => {
  if (!isAllChecked()) {
    ElMessage.error("请完成所有题目后再提交");
    return;
  }

  console.log(calculateScore());
  console.log(userAnswerList, officeAnswerList);
};
</script>

<style lang="scss" scoped>
:deep(.el-radio-group) {
  align-items: flex-start;
}
</style>
