
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { useState } from 'react'
import { ApolloError } from '@apollo/client'

import { Error } from '../utils'


function useError(): [ Error, (e: ApolloError) => void ] {
	const [ error, setError ] = useState<Error>(new Error())

	const onError = (apolloError: ApolloError) => setError(new Error({ apolloError }))

	return [ error, onError ]
}

export default useError
