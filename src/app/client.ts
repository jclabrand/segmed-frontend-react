
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { makeVar } from '@apollo/client'

import { TUser } from './types'


export const userState = makeVar<TUser>(getDefaultUser())


export function getDefaultUser(): TUser {
	return {
		userName: 'guest',
		displayName: '',
		email: '',
		isAuthorized: false
	}
}
