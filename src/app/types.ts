
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


export type TRole = {
	id:				string
	name:			string
	description?:	string
}

export type TUser = {
	id:				string
	userName:		string
	displayName?:	string
	email?:			string
	active:			boolean

	isAuthorized:	boolean
}


export type TSubscriptionData<TSubscriptionResult> = {
	subscriptionData: {
		data?: TSubscriptionResult
	}
}
