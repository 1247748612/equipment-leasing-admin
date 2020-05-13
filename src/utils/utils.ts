import Layout from '@/layout/index.vue'
import { RouteConfig } from 'vue-router'
import { getDictTypesList } from '@/api/dicts'

export function splitMeta(menus: any[]) {
  if ((menus && !menus.length) || !menus) {
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

  const componentPath = menu.componentPath || '@/views/Default.vue'
  if (componentPath.indexOf('layout/index.vue') !== -1) {
    menu['component'] = Layout
  } else {
    menu['component'] = () => import(`@/views${componentPath}`)
  }

  // 设置重定向
  if (menu.children.length && menu.children[0].type === 0) {
    console.log(menu, '设置重定向')
    menu.redirect = `${menu.path}${menu.children[0].path.startsWith('/') ? '' : '/'}${menu.children[0].path}`
  }
  // menu.redirect = menu.redirect === 'noRedirect' ? null : menu.redirect

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
    if (routeItem && (routeItem as any).type === 0) {
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

export function componentPathOption() {
  const whiteNameList = ['Login', 'Page404']
  const context = require.context('@/views', true, /.vue$/)
  let options: any = {
    Layout: '@/layout/index.vue'
  }
  context.keys().forEach((key: any) => {
    const name = context(key).default.options.name
    if (!whiteNameList.includes(name)) {
      options[name] = key.substring(1)
      // options[name] = '@/views' + key.substring(1)
    }
  })
  console.log(options, 'opions')
  return options
}
