import request from '@/utils/request'

export const getRoles = (params: any) => request({
  url: '/roles',
  method: 'get',
  params
})

export const createRoles = (data: any) => request({
  url: '/roles',
  method: 'post',
  data
})

export const updateRoles = (id: any, data: any) => request({
  url: `/roles/${id}`,
  method: 'put',
  data
})

export const getRolesById = (id: any) => request({
  url: `/roles/${id}`,
  method: 'get'
})

export const deleteRoles = (data: any) => request({
  url: '/roles',
  method: 'delete',
  data
})

export const assigningRoles = (data: any) => request({
  url: '/roles/assigningRoles',
  method: 'patch',
  data
})

export const assigningMenus = (data: any) =>
  request({
    url: '/roles/assigningMenus',
    method: 'patch',
    data
  })

export const getRolesList = () => request({
  url: '/roles/list',
  method: 'get'
})
