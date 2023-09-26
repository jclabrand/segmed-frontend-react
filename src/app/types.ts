
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


export type TUser = {
	id:				string
	userName:		string
	displayName?:	string
	email?:			string

	isAuthorized:	boolean
}

export type TSubscriptionData<TSubscriptionResult> = {
	subscriptionData: {
		data?: TSubscriptionResult
	}
}
