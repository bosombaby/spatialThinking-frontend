import { http } from "@/utils/http";

// 定义结果的类型
export type UserResult = {
  status: Number;
  msg: string;
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type UserInfo = {
  status: Number;
  msg: string;
  success: boolean;
  data: object;
};

export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/users/login", { data });
};

export const getUserInfo = (data?: object) => {
  return http.request<UserInfo>("post", "/users/info", { data });
};
