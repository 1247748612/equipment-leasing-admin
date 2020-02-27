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

export const updateRoles = (data: any) => request({
  url: '/roles',
  method: 'put',
  data
})

export const getRolesById = (id: any) => request({
  url: `/roles/${id}`,
  method: 'get',
})

export const deleteRoles = (data: any) => request({
  url: '/roles',
  method: 'delete',
  data
})

export const updateUserRoles = (data: any) => request({
  url: '/userRoles',
  method: 'put',
  data
})

export const getRolesList = () => request({
  url: '/roles/listAll',
  method: 'get',
})
