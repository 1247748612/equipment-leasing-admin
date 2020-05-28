import request from '@/utils/request'

export const rolePagination = (params: any) => request({
  url: '/role/pagination',
  method: 'get',
  params
})

export const createRole = (data: any) => request({
  url: '/role',
  method: 'post',
  data
})

export const updateRole = (id: any, data: any) => request({
  url: `/role/${id}`,
  method: 'put',
  data
})

export const getRoleById = (id: any) => request({
  url: `/role/${id}`,
  method: 'get'
})

export const deleteRole = (data: any) => request({
  url: '/role',
  method: 'delete',
  data
})

export const assigningRoles = (data: any) => request({
  url: '/role/assigningRoles',
  method: 'patch',
  data
})

export const assigningMenus = (data: any) =>
  request({
    url: '/role/assigningMenus',
    method: 'patch',
    data
  })

export const getRoleList = () => request({
  url: '/role/list',
  method: 'get'
})
