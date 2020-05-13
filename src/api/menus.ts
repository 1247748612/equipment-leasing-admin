import request from '@/utils/request'

export const deleteMenus = (data: any) =>
  request({
    url: '/menus',
    method: 'delete',
    data
  })

export const createMenus = (data: any) =>
  request({
    url: '/menus',
    method: 'post',
    data
  })

export const updateMenus = (id: any, data: any) =>
  request({
    url: `/menus/${id}`,
    method: 'put',
    data
  })
