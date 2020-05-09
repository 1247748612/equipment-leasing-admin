import request from '@/utils/request'

export const deleteMenus = (data: any) =>
	request({
		url: '/menu',
		method: 'delete',
		data
	})

export const createMenus = (data: any) =>
	request({
		url: '/menu',
		method: 'post',
		data
	})

export const updateMenus = (data: any) =>
	request({
		url: '/menu',
		method: 'put',
		data
	})

export const updateMenuAuthorizations = (data: any) =>
	request({
		url: '/menuAuthorizations',
		method: 'put',
		data
	})
