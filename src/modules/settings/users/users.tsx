
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { useState } from 'react'
import { gql, useQuery, useSubscription, ApolloError } from '@apollo/client'

import { Error } from '../../../utils'
import { TUser } from '../../../app/types'


function useUsers() {
	const USERS = gql`
			query Users {
				users {
					id userName displayName
				}
			}
		`
		, USER_CREATED = gql`
			subscription UserAdded {
				userAdded {
					id
					userName
					displayName
				}
			}
		`

	const [ error, setError ] = useState<Error>(new Error())

	const onError = (apolloError: ApolloError) => setError(new Error({ apolloError }))

	const { loading, data, refetch } = useQuery<{ users: TUser[] }>(USERS, { onError })

	useSubscription(USER_CREATED, { onData: () => refetch() })

	return { loading, error, users: data?.users || [] }
}

function Users() {
	const { loading, error, users } = useUsers()

	return (
		<div>
			<h3>Usuarios</h3>
			<div>
				{
					users.map((user) => (
						<div key={ user.id }>{ user.displayName }</div>
					))
				}
			</div>

			{ loading && <div>Loading...</div>}
			{ error.has && <div>{ error.message }</div>}
		</div>
	)
}

export default Users
