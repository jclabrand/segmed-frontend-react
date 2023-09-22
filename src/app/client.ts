
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { makeVar } from '@apollo/client'

import { TUser } from './types'


export const userState = makeVar<TUser>(getDefaultUser())
export const authState = makeVar(getAuth())


export function getAuth() {
	return {
		bearer: localStorage.getItem('bearer'),
		token: localStorage.getItem('authorization')
	}
}

export function setAuth(data: { bearer: string, token: string }) {
	localStorage.setItem('bearer', data.bearer)
	localStorage.setItem('authorization', data.token)
	authState(data)
}

export function getDefaultUser(): TUser {
	return {
		userName: 'guest',
		displayName: '',
		email: '',
		isAuthorized: false
	}
}
