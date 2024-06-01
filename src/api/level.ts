import { http } from "@/utils/http";

// 获取题目列表
export const getQuestionList = (data?: object) => {
  return http.post("/levels/question", { data });
};

// 创建闯关记录
export const createLevelRecord = (data?: object) => {
  return http.post("/feedback/record/create", { data });
};

// 获取闯关记录
export const getLevelRecord = (data?: object) => {
  return http.post("/feedback/record/list", { data });
};
