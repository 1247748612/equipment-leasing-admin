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

export const updateUsers = (data) => {
  return request({
    url: '/users',
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
