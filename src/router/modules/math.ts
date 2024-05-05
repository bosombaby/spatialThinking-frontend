// 数学模块菜单
export default {
  path: "/math",
  meta: {
    icon: "ri:calculator-line",
    title: "数学",
    rank: 1
  },
  children: [
    {
      path: "/math/learn",
      meta: {
        title: "学习"
      },
      children: [
        {
          path: "/math/learn/a",
          component: () => import("@/views/math/learn/BasicDemo/index.vue"),
          name: "BasicDemo",
          meta: {
            title: "基础案例"
          }
        },
        {
          path: "/math/learn/b",
          component: () => import("@/views/math/learn/LearnGeometry/index.vue"),
          name: "LearnGeometry",
          meta: {
            title: "认识几何体"
          }
        },
        {
          path: "/math/learn/c",
          component: () => import("@/views/math/learn/SwitchViews/index.vue"),
          name: "SwitchViews",
          meta: {
            title: "视图切换"
          }
        }
      ]
    }
  ]
};
