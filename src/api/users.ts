import request from '@/utils/request'
import { AxiosSuccessData } from '../interfaces/http.interface'

/**
 * @description 获取用户个人信息
 * @param {*} data
 */
export const currentUserInfo = (data?: any) =>
  request({
    url: '/users/info',
    method: 'get',
    data
  })

/**
 * @description 获取个人菜单
 * @param {*} data
 */
export const currentUserMenus = (params?: any) =>
  request({
    url: '/users/menu',
    method: 'get',
    params
  })

/**
 * @description 用户登录
 * @param {*} data
 */
export const login = (data: any) =>
  request({
    url: '/users/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/admin/logout',
    method: 'post'
  })

export const getUsers = (params: any) => {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

export const createUsers = (data: any) => {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export const updateUsers = (id: any, data: any) => {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data
  })
}

export const deleteUsers = (data: any) => {
  return request({
    url: '/users',
    method: 'delete',
    data
  })
}
