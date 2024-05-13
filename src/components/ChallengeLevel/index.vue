<template>
  <div class="flex flex-col gap-y-5">
    <div class="ty-card bg-indigo-100">
      <div class="flex justify-between items-center">
        <!-- 左侧标题 -->
        <div class="text-lg font-bold">
          {{ levelObj.level_name + " | " }}
          <span class="text-sm font-normal">
            {{ levelObj.description }}
          </span>
        </div>
        <IconifyIconOffline :icon="Check" />
        <!-- 计时专区 -->
        <div class="text-base font-bold">
          <span>剩余时间：</span>
          <span class="text-red-500">00:00:00</span>
        </div>
        <!-- 右侧结果 -->
        <div class="flex items-center gap-x-2">
          <div class="text-sm text-red-500" v-if="isHistoryRecord">
            历史得分：{{ levelObj.record_list.score }}
          </div>
          <!-- 点击查看弹窗 -->
          <div class="text-sm ty-link">勋章</div>
        </div>
      </div>
    </div>

    <ul class="question-list ty-card bg-indigo-100 flex-1">
      <li
        v-for="(item, index) in levelObj.question_list"
        :key="item.id"
        class="mb-4"
      >
        <div class="flex items-center gap-x-3">
          <!-- 结果展示 -->
          <div v-if="isHistoryRecord">
            <IconifyIconOffline
              :icon="EmotionSad"
              v-if="userAnswerList[index] !== officeAnswerList[index]"
              class="w-8 h-8 text-red-400"
            /><IconifyIconOffline
              v-if="userAnswerList[index] == officeAnswerList[index]"
              :icon="EmotionHappy"
              class="w-8 h-8 text-sky-400"
            />
          </div>
          <!-- 题目内容 -->
          <div>
            {{ index + 1 + ". " }}
            {{ item.content }}
          </div>
        </div>

        <el-radio-group v-model="userAnswerList[index]" class="flex flex-col">
          <el-radio value="A" size="large" :disabled="isHistoryRecord">
            {{ item.option_a }}
          </el-radio>
          <el-radio value="B" size="large" :disabled="isHistoryRecord">{{
            item.option_b
          }}</el-radio>
          <el-radio
            value="C"
            size="large"
            :disabled="isHistoryRecord"
            v-if="item.option_c"
            >{{ item.option_c }}</el-radio
          >
          <el-radio
            value="D"
            size="large"
            :disabled="isHistoryRecord"
            v-if="item.option_d"
            >{{ item.option_d }}</el-radio
          >
        </el-radio-group>

        <!-- 显示正确答案和解析 -->
        <el-collapse v-if="isHistoryRecord">
          <el-collapse-item title="答案解析">
            <div
              class="font-bold mb-2 pl-4"
              :class="[
                officeAnswerList[index] == userAnswerList[index]
                  ? 'text-sky-400'
                  : 'text-red-400'
              ]"
            >
              正确答案：{{ officeAnswerList[index] }} ，我的答案：
              {{ userAnswerList[index] }}
            </div>
            <div class="pl-4 text-sm" v-html="`${item.solution}`"></div>
          </el-collapse-item>
        </el-collapse>
      </li>
    </ul>
    <div class="flex justify-center ty-card bg-indigo-100">
      <div v-if="!isHistoryRecord">
        <el-button plain>暂存</el-button>
        <el-button type="primary" @click="sumbitAnswer">提交</el-button>
      </div>
      <div v-else>
        <el-button type="primary" @click="reChallenge">重新挑战</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import EmotionSad from "@iconify-icons/ri/emotion-sad-line";
import EmotionHappy from "@iconify-icons/ri/emotion-happy-line";
import { ref, reactive, onMounted } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { getCurrentRoute } from "@/hooks/useRouterState";
import { getQuestionList, createLevelRecord } from "@/api/level";
defineOptions({
  name: "Beginner"
});

const userStore = useUserStoreHook();
// 获取当前关卡的id
const { fullPath } = getCurrentRoute();
const match = fullPath.match(/\d+$/);
const level_id = match ? parseInt(match[0]) + 1 : 1;

let userAnswerList = ref([]);
let officeAnswerList = ref([]);

// 生成正确答案列表
const getOfficeAnswerList = () => {
  const list = [];
  levelObj.value.question_list.forEach(item => {
    list.push(item.answer);
  });

  officeAnswerList.value = list;
};

// 填充历史闯关记录
const fillHistoryRecord = () => {
  userAnswerList.value = levelObj.value.record_list.answer.split(",");
};

let levelObj = ref({});
const isHistoryRecord = ref(false);
const getQuestionData = async () => {
  const params = {
    user_id: userStore.id,
    level_id
  };
  const res = await getQuestionList(params);
  levelObj.value = res.data;
  isHistoryRecord.value = res.data.is_has_record;
  getOfficeAnswerList();

  isHistoryRecord.value && fillHistoryRecord();
};

getQuestionData();

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
  if (!isAllChecked()) {
    ElMessage.error("请完成所有题目后再提交");
    return;
  }

  const score = calculateScore();
  const params = {
    user_id: userStore.id,
    level_id,
    result: "已完成",
    answer: userAnswerList.value.join(","),
    score: score
  };
  const res = await createLevelRecord(params);
  ElMessage.success(res.msg);
  getQuestionData();
};

// 重新挑战
const reChallenge = () => {
  userAnswerList.value = [];
  isHistoryRecord.value = false;
};
</script>

<style lang="scss" scoped>
:deep(.el-radio-group) {
  align-items: flex-start;
}
</style>
