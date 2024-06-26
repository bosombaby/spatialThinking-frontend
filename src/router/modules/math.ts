// 数学模块菜单
import frameView from "@/layout/frameView.vue";

export default {
  path: "/math",
  redirect: "/math/learn/0",
  meta: {
    icon: "ri:calculator-line",
    title: "数学",
    rank: 1
  },
  children: [
    {
      path: "/math/learn",
      redirect: "/math/learn/0",
      meta: {
        icon: "ri:book-2-line",
        title: "学习"
      },
      children: [
        {
          path: "/math/learn/0",
          component: () => import("@/views/math/learn/BasicDemo/index.vue"),
          name: "BasicDemo",
          meta: {
            title: "基础案例"
          }
        },
        {
          path: "/math/learn/1",
          component: () => import("@/views/math/learn/LearnGeometry/index.vue"),
          name: "LearnGeometry",
          meta: {
            title: "认识几何体"
          }
        },
        {
          path: "/math/learn/detail/:id",
          component: () =>
            import("@/views/math/learn/OperateGeometry/index.vue"),
          name: "OperateGeometry",
          meta: {
            title: "详情页面",
            showLink: false
          }
        },
        {
          path: "/math/learn/detail",
          component: () => import("@/views/math/learn/OperateGeometry/new.vue"),
          name: "OperateGeometryNew",
          meta: {
            title: "详情页面",
            showLink: false
          }
        },
        {
          path: "/math/learn/2",
          component: () => import("@/views/math/learn/SwitchViews/index.vue"),
          name: "SwitchViews",
          meta: {
            title: "视图切换"
          }
        }
      ]
    },
    {
      path: "/math/game",
      meta: {
        icon: "ri:gamepad-line",
        title: "游戏"
      },
      children: [
        {
          path: "/math/game/0",
          name: "RacingGame",
          component: frameView,
          meta: {
            title: "赛车游戏",
            frameSrc: "https://vr.ff.com/us/"
          }
        },
        {
          path: "/math/game/1",
          name: "MireCraft",
          component: frameView,
          meta: {
            title: "我的世界",
            frameSrc:
              "http://localhost:8080/examples/webgl_geometry_minecraft.html"
          }
        }
      ]
    },
    {
      path: "/math/level",
      meta: {
        icon: "ri:star-line",
        title: "闯关"
      }
    }
  ]
};
