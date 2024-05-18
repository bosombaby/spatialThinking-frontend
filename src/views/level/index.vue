<template>
  <div>
    <challenge-record
      v-if="isHistoryRecord"
      :level-obj="levelObj"
      v-model:is-re-challenge="isReChallenge"
      @getQuestionData="getQuestionData"
    />
    <start-challenge
      v-else
      :level-obj="levelObj"
      :level_id="level_id"
      v-model:is-re-challenge="isReChallenge"
      @getQuestionData="getQuestionData"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { getCurrentRoute } from "@/hooks/useRouterState";
import { getQuestionList } from "@/api/level";
import ChallengeRecord from "./ChallengeRecord/index.vue";
import StartChallenge from "./StartChallenge/index.vue";

defineOptions({
  name: "Level"
});

const userStore = useUserStoreHook();
// 获取当前关卡的id
const { fullPath } = getCurrentRoute();
const match = fullPath.match(/\d+$/);
const level_id = match ? parseInt(match[0]) : 1;

// 是否重新挑战
const isReChallenge = ref(false);

// 获取题目数据
let levelObj = ref({});
const isHistoryRecord = ref(false);
const getQuestionData = async () => {
  const params = {
    level_id: level_id,
    user_id: userStore.id
  };
  const res = await getQuestionList(params);
  levelObj.value = res.data;
  isHistoryRecord.value = res.data.is_has_record && !isReChallenge.value;
};

getQuestionData();
</script>
