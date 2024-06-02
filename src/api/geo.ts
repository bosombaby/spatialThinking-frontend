import { http } from "@/utils/http";

// 获取国旗与国家
export const getNationFlag = (data?: object) => {
  return http.get("/geo/nationFlag/list", { data });
};

// 根据 id 查询国家详情
export const getNationDetail = (data?: object) => {
  return http.post("/geo/nationFlag/detail", { data });
};
