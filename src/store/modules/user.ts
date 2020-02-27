import router from '@/router'
import { RouteConfig } from 'vue-router'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import { joinRoute } from '@/utils/utils'
import { constantRoutes } from '../../router/index'
import Layout from '@/layout/index.vue'

import store from '@/store'

export interface IUserState {
  token: string
  name: string
  avatar: string,
  asyncRoute: RouteConfig[]
  dynamicRoute: RouteConfig[]
  menus: any
  roles: any[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public asyncRoute: RouteConfig[] = []
  public dynamicRoute: RouteConfig[] = []
  public menus = []
  public roles = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_ASYNC_ROUTE(menus: any) {
    const newRoute: RouteConfig[] = joinRoute(menus)
    console.log('newRoute', newRoute)
    this.dynamicRoute = newRoute
    this.asyncRoute = constantRoutes.concat(newRoute)
  }

  @Mutation
  private SET_MENUS(menus: any) {
    this.menus = menus || []
  }

  @Mutation
  private SET_ROLES(roles: any) {
    this.roles = roles || []
  }

  @Action
  public async Login(userInfo: { name: string, password: string }) {
    let { name, password } = userInfo
    name = name.trim()
    try {
      const data: any = await login({ name, password })
      setToken(data.token)
      this.SET_TOKEN(data.token)
    } catch {
    }
    // this.GetUserInfo()
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_MENUS([])
    this.SET_ROLES([])
    this.SET_ASYNC_ROUTE([])
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const data: any = await getUserInfo({ /* Your params here */ })
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { nickname, icon, roles } = data.user

    const menus = roles[0].menus
    // roles must be a non-empty array
    this.SET_ROLES(roles)
    this.SET_NAME(nickname)
    this.SET_AVATAR(icon)
    this.SET_ASYNC_ROUTE(menus)
    this.SET_MENUS(menus)
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    this.SET_TOKEN('')
    this.SET_MENUS([])
    this.SET_ROLES([])
    this.SET_ASYNC_ROUTE([])
  }
}

export const UserModule = getModule(User)
