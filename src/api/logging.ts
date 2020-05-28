import request from '@/utils/request'

export const logPagination = (params: any) => request({
  url: '/logging/pagination',
  method: 'get',
  params
})

export const dellAllLog = (params: any) => request({
  url: '/logging/all',
  method: 'delete',
  params
})
