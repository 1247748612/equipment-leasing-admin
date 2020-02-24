import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import store from '@/store'

export interface IUserState {
  token: string
  name: string
  avatar: string,
  asyncRoute: any,
  menus: any
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public asyncRoute = []
  public menus = []

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
  private SET_ASYNC_ROUTE(menus: object[]) {

  }

  @Mutation
  private SET_MENUS(menus: object[]) {
    this.menus = menus
  }

  @Action
  public async Login(userInfo: { name: string, password: string }) {
    let { name, password } = userInfo
    name = name.trim()
    const data: any = await login({ name, password })
    setToken(data.token)
    this.SET_TOKEN(data.token)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
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
    const { nickname, icon } = data.user
    // roles must be a non-empty array
    this.SET_NAME(nickname)
    this.SET_AVATAR(icon)
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    this.SET_TOKEN('')
  }
}

export const UserModule = getModule(User)
