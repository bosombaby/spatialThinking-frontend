// 数学模块菜单
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
          path: "/math/learn/detail",
          component: () =>
            import("@/views/math/learn/OperateGeometry/index.vue"),
          name: "OperateGeometry",
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
    }
  ]
};
