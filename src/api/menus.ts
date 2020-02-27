import request from '@/utils/request'

export const deleteMenus = (data: any) => request({
    url: '/menus',
    method: 'delete',
    data
})

export const createMenus = (data: any) => request({
    url: '/menus',
    method: 'post',
    data
})

export const updateMenus = (data: any) => request({
    url: '/menus',
    method: 'put',
    data
})


export const updateMenuAuthorizations = (data: any) => request({
  url: '/menuAuthorizations',
  method: 'put',
  data
})
