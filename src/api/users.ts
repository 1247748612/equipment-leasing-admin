import request from '@/utils/request'

/**
 * @description 获取用户个人信息
 * @param {*} data
 */
export const currentUserInfo = (data?: any) =>
  request({
    url: '/user/info',
    method: 'post',
    data
  })

/**
 * @description 获取个人菜单
 * @param {*} data
 */
export const currentUserMenus = (params?: any) =>
  request({
    url: '/user/menu',
    method: 'get',
    params
  })

/**
 * @description 用户登录
 * @param {*} data
 */
export const login = (data: any) =>
  request({
    url: '/user/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/user/logout',
    method: 'post'
  })

export const userPagination = (params: any) => {
  return request({
    url: '/user/pagination',
    method: 'get',
    params
  })
}

export const createUser = (data: any) => {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export const updateUser = (id: any, data: any) => {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data
  })
}

export const deleteUser = (data: any) => {
  return request({
    url: '/user',
    method: 'delete',
    data
  })
}

export const onlineUser = (params?: any) => {
  return request({
    url: '/user/online',
    method: 'get',
    params
  })
}

export const outOnlineUser = (data?: any) => {
  return request({
    url: '/user/out',
    method: 'post',
    data
  })
}
