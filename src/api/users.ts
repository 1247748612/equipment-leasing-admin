import request from '@/utils/request'

export const getUserInfo = (data: any) =>
  request({
    url: '/admin/user',
    method: 'get',
    data
  })

export const login = (data: any) =>
  request({
    url: '/admin/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/admin/logout',
    method: 'post'
  })
