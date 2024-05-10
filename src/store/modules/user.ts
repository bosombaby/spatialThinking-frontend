import { defineStore } from "pinia";
import { store } from "@/store";
import type { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { router, resetRouter } from "@/router";
import { storageLocal } from "@pureadmin/utils";
// import { getLogin, refreshTokenApi } from "@/api/user";
import { getLogin, getUserInfo } from "@/api/newUser";

import type { UserResult } from "@/api/newUser";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { type DataInfo, setToken, removeToken, userKey } from "@/utils/auth";
import { log } from "console";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    id: storageLocal().getItem<DataInfo<number>>(userKey)?.id ?? "",
    // 用户信息
    userInfo: storageLocal().getItem("userInfo") ?? {},
    // 用户名
    username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    // 页面级别权限
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储用户信息 **/
    SET_USERINFO(data: DataInfo<number>) {
      this.userInfo = data;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value);
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            if (data.status === 200) {
              setToken(data.data);
              this.id = data.data.id;
              this.getUserInfo();
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /** 获取用户信息 */
    async getUserInfo() {
      return new Promise<UserResult>((resolve, reject) => {
        getUserInfo({ userId: this.id })
          .then(data => {
            if (data.status === 200) {
              this.userInfo = data.data;
              storageLocal().setItem("userInfo", this.userInfo);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.id = "";
      this.username = "";
      this.roles = [];
      this.userInfo = {};
      storageLocal().removeItem("userInfo");
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then(data => {
            if (data) {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
