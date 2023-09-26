
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { gql, useMutation, useReactiveVar, ApolloError } from '@apollo/client'

import { Error } from '../utils'
import { authState, userState, setAuth, getDefaultUser } from '../app/client'
import { Home, NotFound } from '../modules/basic'
import { Users } from '../modules/settings'


function useAuthorized() {
	const SIGNOUT = gql`
			mutation SignOut($bearer: String!) {
				signOut(bearer: $bearer)
			}
		`

	const user = useReactiveVar(userState)
		, auth = useReactiveVar(authState)

	const [ error, setError ] = useState<Error>(new Error())

	const onCompleted = () => {
			setAuth({ bearer: '', token: '' })
			userState(getDefaultUser())
		}
		, onError = (apolloError: ApolloError) => setError(new Error({ apolloError }))

	const [ serverSignOut, { loading } ] = useMutation(SIGNOUT, { onCompleted, onError })

	const signOut = () => serverSignOut({ variables: { bearer: auth.bearer } })

	return { loading, error, user, signOut }
}

function Authorized() {
	const { loading, error, user, signOut } = useAuthorized()

	return (
		<>
			<header>

			</header>
			<main>
				<div>
					{ user.displayName }
				</div>
				
				<button onClick={ signOut }>Cerrar sesión</button>

				<Routes>
					<Route path="/" element={ <Home/> } />

					<Route path="configuracion">
						<Route path="usuarios" element={ <Users/> } />
					</Route>

					<Route path="*" element={ <NotFound/> } />
				</Routes>

				{ loading && <div>Loading...</div>}
				{ error.has && <div>{ error.message }</div>}
			</main>
		</>
	)
}

export default Authorized
