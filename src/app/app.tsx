
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { gql, useReactiveVar, useQuery } from '@apollo/client'

import { TUser } from './types'
import { userState, getDefaultUser } from './client'
import { Guest } from '../workspaces/guest'


function useApp() {
	const USER = gql`
			query CurrentUser($bearer: String!) {
				currentUser(bearer: $bearer) {
					id userName displayName
				}
			}
		`

	const user = useReactiveVar(userState)

	const onError = () => userState(getDefaultUser())
		, onCompleted = ({ currentUser }: { currentUser: TUser }) => userState(currentUser)

	const { loading } = useQuery(USER, { onError, onCompleted, variables: { bearer: '' } })

	return { loading, user }
}

export function App() {
	const { loading } = useApp()

	if (loading) return (<div>Loading...</div>)

	return (
		<div>
			<Guest/>
		</div>
	)
}
