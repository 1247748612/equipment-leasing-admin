import request from '@/utils/request'

export const getArticleAll = (params: any) =>
  request({
    url: '/article',
    method: 'get',
    params
  })

export const getArticle = (id: string, params?: any) =>
  request({
    url: `/article/${id}`,
    method: 'get',
    params
  })

export const createArticle = (data: any) =>
  request({
    url: '/article',
    method: 'post',
    data
  })

export const deleteArticles = (data: any) =>
  request({
    url: '/article',
    method: 'delete',
    data
  })

export const updateArticle = (id: string, data: any) =>
  request({
    url: `/article/${id}`,
    method: 'put',
    data
  })
