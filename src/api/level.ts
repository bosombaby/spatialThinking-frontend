import { http } from "@/utils/http";

// 获取题目列表
export const getQuestionList = (data?: object) => {
  return http.post("/levels/question", { data });
};
