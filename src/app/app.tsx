
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { gql, useReactiveVar, useQuery } from '@apollo/client'

import { TUser } from './types'
import { authState, userState, getDefaultUser } from './client'

import { Guest } from '../workspaces/guest'
import Authorized from '../workspaces/authorized'

function useApp() {
	const USER = gql`
			query CurrentUser($bearer: String!) {
				currentUser(bearer: $bearer) {
					id userName displayName
					isAuthorized @client
				}
			}
		`

	const user = useReactiveVar(userState)
		, auth = useReactiveVar(authState)

	const onError = () => userState(getDefaultUser())
		, onCompleted = ({ currentUser }: { currentUser: TUser }) => userState(currentUser)

	const { loading } = useQuery(USER, { onError, onCompleted, variables: { bearer: auth.bearer } })

	return { loading, user }
}

export function App() {
	const { loading, user } = useApp()

	if (loading) return (<div>Loading...</div>)

	if (user.isAuthorized) return (<Authorized/>)

	return (
		<div>
			<Guest/>
		</div>
	)
}
