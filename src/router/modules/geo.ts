// 地理菜单模块
import frameView from "@/layout/frameView.vue";
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
          path: "/geo/learn/detail",
          name: "NationalFlagDetail",
          component: () =>
            import("@/views/geo/learn/NationalFlagDetail/index.vue"),
          meta: {
            title: "详情页面",
            showLink: false
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
      },
      children: [
        {
          path: "/geo/game/0",
          name: "Aircraft",
          component: frameView,
          meta: {
            title: "飞行器",
            frameSrc: "https://aircraft.vrteam.top/"
          }
        },
        {
          path: "/geo/game/1",
          name: "ExperienceCuriosity",
          component: frameView,
          meta: {
            title: "探索好奇心",
            frameSrc: "https://eyes.nasa.gov/curiosity/"
          }
        },
        {
          path: "/geo/game/2",
          name: "ExperienceInsight",
          component: frameView,
          meta: {
            title: "探索洞察力",
            frameSrc:
              "https://eyes.nasa.gov/apps/experience-insight/InSight.html"
          }
        }
      ]
    },
    {
      path: "/geo/space",
      meta: {
        icon: "ri:earth-fill",
        title: "航天"
      },
      children: [
        {
          path: "/geo/space/0",
          name: "Earth",
          component: frameView,
          meta: {
            title: "地球",
            frameSrc: "https://eyes.nasa.gov/apps/earth/"
          }
        },
        {
          path: "/geo/space/1",
          name: "SolarSystem",
          component: frameView,
          meta: {
            title: "太阳系",
            frameSrc: "https://eyes.nasa.gov/apps/solar-system/#/home"
          }
        },
        {
          path: "/geo/space/2",
          name: "Asteroids",
          component: frameView,
          meta: {
            title: "小行星",
            frameSrc: "https://eyes.nasa.gov/apps/asteroids/#/home"
          }
        },
        {
          path: "/geo/space/3",
          name: "Exoplanets",
          component: frameView,
          meta: {
            title: "系外行星",
            frameSrc: "https://eyes.nasa.gov/apps/exo/"
          }
        }
      ]
    },
    {
      path: "/geo/level",
      meta: {
        icon: "ri:star-line",
        title: "闯关"
      },
      children: [
        {
          path: "/geo/level/3",
          component: () => import("@/views/level/index.vue"),
          name: "GeoBeginner",
          meta: {
            title: "入门"
          }
        },
        {
          path: "/geo/level/4",
          component: () => import("@/views/level/index.vue"),
          name: "GeoEasy",
          meta: {
            title: "简单"
          }
        },
        {
          path: "/geo/level/5",
          component: () => import("@/views/level/index.vue"),
          name: "GeoMedium",
          meta: {
            title: "中等"
          }
        }
      ]
    }
  ]
};
