import Layout from '@/layout/index.vue'
import { RouteConfig } from 'vue-router'
import { getDictTypesList } from '@/api/dicts'

export function splitMeta(menus: any[]) {
  if (menus && !menus.length || !menus) {
    return []
  }
  const result = []
  for (let menu of menus) {
    const children: any[] = splitMeta(menu.children)
    const menuItem = {
      ...menu,
      ...menu.meta,
      children
    }
    Reflect.deleteProperty(menuItem, 'meta')
    result.push(menuItem)
  }
  return result
}

function recursiveChildrenRoute(menu: any) : RouteConfig | any {
  if (!menu) {
    return undefined
  }
  if (!menu.path) {
    return undefined
  }
  // 递归路由
  const childrenRoute = joinRoute(menu.children)

  // const componentPath = menu.componentPath || '@/views/Default.vue'
  const componentPath = '@/views/Default.vue'
  menu['component'] = () => import(`@/views/${componentPath.replace('@/views/', '')}`)
  menu.path = '/' + menu.path + String(menu.id)
  menu.name = menu.name + String(menu.id)
  menu.meta.hidden = !menu.meta.hidden
  if (childrenRoute.length > 0) {
    menu.children = childrenRoute
  } else {
    menu.children = null
  }
  console.log(menu, 'menu')
  return menu
}

export function joinRoute(menus: any) {
  console.log(menus, 'joinRoute')
  if (!menus || !menus.length) {
    return []
  }
  const asyncRoute: RouteConfig[] = []
  menus.forEach((item: any) => {
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
    const { message, data } = await getDictTypesList()
    const a = data.map((item: any) => {
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
