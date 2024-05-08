export default {
  path: "/profile",
  meta: {
    icon: "ri:user-3-line",
    title: "个人中心",
    rank: 100
  },
  children: [
    {
      path: "/profile/info",
      name: "MyInformation",
      component: () => import("@/views/profile/MyInformation/index.vue"),
      meta: {
        title: "我的信息"
      }
    },
    {
      path: "/profile/records",
      name: "ChallengeRecord",
      component: () => import("@/views/profile/ChallengeRecord/index.vue"),
      meta: {
        title: "闯关记录"
      }
    },
    {
      path: "/profile/pwd",
      name: "ChangePassword",
      component: () => import("@/views/profile/ChangePassword/index.vue"),
      meta: {
        title: "修改密码"
      }
    }
  ]
};
