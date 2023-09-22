
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ApolloError } from '@apollo/client'


interface ErrorOptions {
	message?:		string,
	apolloError?:	ApolloError
}

class Error {
	public message: string
	public has: boolean

	public constructor(options: ErrorOptions = { message: '' }) {
		this.message = options.apolloError?.message ?? (options.message || '')
		this.has = this.message.length ? true : false
	}
}

export default Error
