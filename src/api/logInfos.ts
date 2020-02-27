import request from '@/utils/request'

export const getLogInfos = (params: any) => request({
  url: '/logInfos',
  method: 'get',
  params
})
