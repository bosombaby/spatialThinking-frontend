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
        <!-- 右侧结果 -->
        <div class="flex items-center gap-x-2">
          <div class="text-sm text-red-500">
            当前得分：{{ levelObj.record_list.score }}
          </div>
          <!-- 点击查看弹窗 -->
          <div class="text-sm ty-link" @click="badgeVisible = true">勋章</div>
          <div class="text-sm ty-link" @click="scoringVisible = true">
            答题分析
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
        <div class="flex items-center gap-x-2">
          <!-- 结果展示 -->
          <div>
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
          <div class="flex">
            <span>{{ index + 1 + ". " }}</span>
            <p>{{ item.content }}</p>
            <span class="text-red-500 min-w-16">
              {{ item.question_score + "分" }}</span
            >
          </div>
        </div>

        <el-radio-group v-model="userAnswerList[index]" class="flex flex-col">
          <el-radio value="A" size="large" disabled>
            <span
              :class="[
                userAnswerList[index] == 'A' ? 'font-bold text-black' : ''
              ]"
              >{{ item.option_a }}</span
            >
          </el-radio>
          <el-radio value="B" size="large" disabled>
            <span
              :class="[
                userAnswerList[index] == 'B' ? 'font-bold text-black' : ''
              ]"
              >{{ item.option_b }}</span
            ></el-radio
          >
          <el-radio value="C" size="large" disabled v-if="item.option_c"
            ><span
              :class="[
                userAnswerList[index] == 'C' ? 'font-bold text-black' : ''
              ]"
              >{{ item.option_c }}</span
            ></el-radio
          >
          <el-radio value="D" size="large" disabled v-if="item.option_d"
            ><span
              :class="[
                userAnswerList[index] == 'D' ? 'font-bold text-black' : ''
              ]"
              >{{ item.option_d }}</span
            ></el-radio
          >
        </el-radio-group>

        <!-- 显示正确答案和解析 -->
        <el-collapse>
          <el-collapse-item title="答案解析">
            <div
              class="font-bold mb-2 pl-4"
              :class="[
                officeAnswerList[index] == userAnswerList[index]
                  ? 'text-sky-400'
                  : 'text-red-400'
              ]"
            >
              <span>
                正确答案：{{ officeAnswerList[index] }} ，我的答案：
                {{ userAnswerList[index] }}</span
              >
              <span
                class="ml-6 ty-link text-red-300"
                @click="handleLinkClick(item.solving_link)"
                >辅助链接</span
              >
            </div>
            <div class="pl-4 text-sm" v-html="`${item.solution}`"></div>
          </el-collapse-item>
        </el-collapse>
      </li>
    </ul>
    <div class="flex justify-center ty-card bg-indigo-100">
      <el-button type="primary" @click="reChallenge">重新挑战</el-button>
    </div>

    <!-- 勋章查看 -->
    <el-dialog title="勋章预览" v-model="badgeVisible" width="30%">
      <view-badge-dialog :badge="levelObj.badge" />
    </el-dialog>

    <!-- 答题分析 -->
    <el-dialog title="答题分析" v-model="scoringVisible" width="30%">
      <view-scoring-dialog :scoring="levelObj.scoring" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import EmotionSad from "@iconify-icons/ri/emotion-sad-line";
import EmotionHappy from "@iconify-icons/ri/emotion-happy-line";
import ViewBadgeDialog from "../components/ViewBadgeDialog.vue";
import ViewScoringDialog from "../components/ViewScoringDialog.vue";

const props = defineProps({
  levelObj: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(["update:isReChallenge", "getQuestionData"]);
const userAnswerList = ref([]);
const officeAnswerList = ref([]);
const badgeVisible = ref(false);
const scoringVisible = ref(false);
// 计算官方答案和用户答案
const generateAnswerList = () => {
  userAnswerList.value = props.levelObj.record_list.answer.split(",");
  const list = [];
  props.levelObj.question_list.forEach(item => {
    list.push(item.answer);
  });

  officeAnswerList.value = list;
};

generateAnswerList();

// 辅助链接点击
const handleLinkClick = target => {
  const originUrl = window.location.origin;
  const currentUrl = originUrl + "/#" + target;
  window.open(currentUrl, "_blank");
};

// 重新挑战
const reChallenge = () => {
  emits("getQuestionData");
  emits("update:isReChallenge", true);
};

onMounted(() => {
  nextTick(() => {
    MathJax.texReset();
    MathJax.typesetClear();
    MathJax.typesetPromise();
  });
});
</script>

<style lang="scss" scoped>
:deep(.el-radio-group) {
  align-items: flex-start;
}
</style>
