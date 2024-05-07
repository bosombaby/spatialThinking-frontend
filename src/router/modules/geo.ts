// 地理菜单模块

export default {
  path: "/geo",
  redirect: "/geo/learn/0",
  meta: {
    icon: "ri:global-line",
    title: "地理",
    rank: 2
  },
  children: [
    {
      path: "/geo/learn",
      redirect: "/geo/learn/0",
      meta: {
        icon: "ri:book-2-line",
        title: "学习"
      },
      children: [
        {
          path: "/geo/learn/0",
          name: "NationalFlag",
          component: () => import("@/views/geo/learn/NationalFlag/index.vue"),
          meta: {
            title: "国旗与国家"
          }
        },
        {
          path: "/geo/learn/1",
          name: "EarthRoaming",
          component: () => import("@/views/geo/learn/EarthRoaming/index.vue"),
          meta: {
            title: "地球漫游"
          }
        }
      ]
    },
    {
      path: "/geo/game",
      meta: {
        icon: "ri:gamepad-line",
        title: "游戏"
      }
    },
    {
      path: "/geo/level",
      meta: {
        icon: "ri:star-line",
        title: "闯关"
      }
    }
  ]
};
