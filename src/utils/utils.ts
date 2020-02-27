import Layout from '@/layout/index.vue'
import { RouteConfig } from 'vue-router'
import { getDictTypesList } from '@/api/dicts'

const metaKey = ['title', 'icon', 'hidden', 'alwaysShow', 'breadcrumb', 'affix']

interface menuDto {
  id: number
  name: string
  redirect: string
  title: string
  icon: string
  hidden: number
  alwaysShow: number
  breadcrumb: number,
  noCache: number,
  affix: number,
  type: number,
  rank: number,
  path: string,
  componentPath: string,
  parentId: number,
  children: menuDto[]
}

function recursiveChildrenRoute(menu: menuDto) : RouteConfig | any {
  if (!menu) {
    return undefined
  }
  if (!menu.path) {
    return undefined
  }
  let routeItem: RouteConfig = {
    path: '',
  }
  routeItem.path = menu.path
  routeItem.name = menu.name
  // 递归路由
  const childrenRoute = joinRoute(menu.children)

  routeItem.meta = {}
  routeItem.meta.title = menu.title
  routeItem.meta.icon = menu.icon || ''
  routeItem.meta.hidden = !!menu.hidden
  routeItem.meta.alwaysShow = !!menu.alwaysShow
  routeItem.meta.breadcrumb = !!menu.breadcrumb
  routeItem.meta.affix = !!menu.affix
  routeItem.meta.hidden = !!menu.hidden
  const componentPath = menu.componentPath || '@/views/Default.vue'
  routeItem.component = () => import(`@/views/${componentPath.replace('@/views/', '')}`)

  if ((menu.componentPath && menu.componentPath.toLocaleLowerCase() === 'layout')) {
    console.log(menu.title, 'layout')
    routeItem.redirect = menu.redirect
    routeItem.component = Layout
  } else {
    routeItem.component = () => import(`@/views/${componentPath.replace('@/views/', '')}`)
  }


  if (childrenRoute.length > 0) {
    routeItem.children = childrenRoute
  }
  return routeItem
}

export function joinRoute(menus: menuDto[]) {
  if (!menus || !menus.length) {
    return []
  }
  const asyncRoute: RouteConfig[] = []
  menus.forEach((item) => {
    const routeItem: RouteConfig = recursiveChildrenRoute(item)
    if (routeItem) {
      asyncRoute.push(routeItem)
    }
  })
  return asyncRoute
}

  // 获取所有字典类型
export async function getDictTypesOptions() {
  try {
    const { msg, data } = await getDictTypesList()
    const a = data.map((item) => {
      return {
        label: item.typeName,
        value: item.id
      }
    })
    console.log(a)
    return a
  } catch (error) {
    console.log('error', '错误')
    return []
  }
}
