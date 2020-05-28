import Layout from '@/layout/index.vue'
import { RouteConfig } from 'vue-router'

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
      children: children.length ? children : null
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

export function componentPathOption() {
  const whiteNameList = ['Login', 'Page404']
  const context: any = require.context('@/views', true, /.vue$/)
  let options: any = [
    {
      label: 'Layout',
      value: '@/layout/index.vue'
    }
  ]
  context.keys().forEach((key: any) => {
    const contextValue: any = context(key).default
    const name = contextValue && contextValue.options && contextValue.options.name
    if (!whiteNameList.includes(name)) {
      options.push({
        label: name,
        value: key.substring(1)
      })
    }
  })
  return options
}
