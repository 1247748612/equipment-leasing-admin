import router from '@/router'
import { RouteConfig } from 'vue-router'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, currentUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import { joinRoute, splitMeta } from '@/utils/utils'
import { constantRoutes } from '../../router/index'
import Layout from '@/layout/index.vue'

import store from '@/store'
import { LoginForm } from '../../interfaces/user.interface'
import { currentUserMenus } from '../../api/users'

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
  public menus: any[] = []
  public roles = []
  public phoneNumber = ''

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_PHONE_NUMBER(phoneNumber: string) {
    this.phoneNumber = phoneNumber
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_ASYNC_ROUTE(menus: any) {
    const newRoute: RouteConfig[] = joinRoute(menus)
    console.log('newRoute', newRoute)
    // console.log(menus)
    this.dynamicRoute = newRoute
    this.asyncRoute = constantRoutes.concat(newRoute)
  }

  @Mutation
  private SET_MENUS(menus: any) {
    this.menus = splitMeta(menus)
    console.log(this.menus)
  }

  @Mutation
  private SET_ROLES(roles: any) {
    this.roles = roles || []
  }

  @Action
  public async Login(userInfo: LoginForm) {
    try {
      console.log(userInfo)
      const response = await login(userInfo)
      setToken(response.data.accessToken)
      this.SET_TOKEN(response.data.accessToken)
    } catch (error) {
      console.log(error)
    }
    // this.currentUserInfo()
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
  public async UserInfo() {
    if (this.token === '') {
      throw Error('currentUserInfo: token is undefined!')
    }
    const data = await currentUserInfo({ /* Your params here */ })
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    console.log(data, 'user, info')
    const { nickname, phonenumber, avatar, roles } = data.data
    
    // roles must be a non-empty array
    this.SET_ROLES(roles)
    this.SET_NAME(nickname)
    this.SET_AVATAR(avatar)
    this.SET_PHONE_NUMBER(phonenumber)
  }
  
  @Action
  public async UserMenu() {
    try {
      const data = await currentUserMenus()
      this.SET_ASYNC_ROUTE(data.data)
      this.SET_MENUS(data.data)
      console.log(data)
    } catch(error) {
    }
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
