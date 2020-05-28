import request from '@/utils/request'

export const deleteMenu = (data: any) =>
  request({
    url: '/menu',
    method: 'delete',
    data
  })

export const createMenu = (data: any) =>
  request({
    url: '/menu',
    method: 'post',
    data
  })

export const updateMenu = (id: any, data: any) =>
  request({
    url: `/menu/${id}`,
    method: 'put',
    data
  })
