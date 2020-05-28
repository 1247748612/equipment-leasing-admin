import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { ReturnResponseData } from './types'

export const dictionaryTypePagination = (params: any) => request({
  url: '/dictionary/type/pagination',
  method: 'get',
  params
})

export const dictionaryTypeList = (name: string, params: any) => request({
  url: `/dictionary/type/${name}`,
  method: 'get',
  params
})

export const dictionaryTypeListAll = (params: any) => request({
  url: `/dictionary/type/list`,
  method: 'get',
  params
})

export const delDictionaryType = (data: any) => request({
  url: '/dictionary/type',
  method: 'delete',
  data
})

export const delDictionary = (data: any) => request({
  url: '/dictionary',
  method: 'delete',
  data
})

export const createDictionaryType = (data: any) => request({
  url: '/dictionary/type',
  method: 'post',
  data
})

export const createDictionary = (data: any) => request({
  url: '/dictionary',
  method: 'post',
  data
})

export const updateDictionaryType = (id: string, data: any) => request({
  url: `/dictionary/type/${id}`,
  method: 'put',
  data
})

export const updateDictionary = (id: string, data: any) => request({
  url: `/dictionary/${id}`,
  method: 'put',
  data
})
