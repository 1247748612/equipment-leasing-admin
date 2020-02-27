import { AxiosResponse } from 'axios';
import request from '@/utils/request'
import { ReturnResponseData } from './types';

export const getDicts = (params: any) => request({
  url: '/dicts',
  method: 'get',
  params
})

export const createDicts = (data: any) => request({
  url: '/dicts',
  method: 'post',
  data
})

export const updateDicts = (data: any) => request({
  url: '/dicts',
  method: 'put',
  data
})

export const getDictsById = (id: any) => request({
  url: `/dicts/${id}`,
  method: 'get',
})

export const deleteDicts = (data: any) => request({
  url: '/dicts',
  method: 'delete',
  data
})

export const updateUserDicts = (data: any) => request({
  url: '/userDicts',
  method: 'put',
  data
})

export const getDictTypesList = () => request({
  url: '/dictTypes/listAll',
  method: 'get',
})
