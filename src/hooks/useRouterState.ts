import { useRoute } from 'vue-router'

// 获取当前路由信息
const getCurrentRoute = () => {
  const route = useRoute()

  const fullPath = route.fullPath
  const urlParams = { ...route.query, ...route.params }

  console.log(route, 'route')

  return { fullPath, ...urlParams }
}

// 新的页面打开路由
const openNewPage = (url: string) => {
  const origin = window.location.origin
  console.log(window.location, 'window.location')

  window.open(`${origin}/#${url}`, '_blank')
}

export { getCurrentRoute, openNewPage }
