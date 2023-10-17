
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { useState } from 'react'
import { gql, useMutation, ApolloError } from '@apollo/client'

import { ErrorDialog, Form, Input, Loader } from '../../../components'
import { setAuth } from '../../../app/client'
import { Error } from '../../../utils'

import './signin.css'


interface ISignInData {
	userName: string
	password: string
}

function useSignIn() {
	const SIGNIN = gql`
			mutation SignIn($data: ISignInArgs!) {
				signIn(data: $data) {
					bearer
					token: authorization
				}
			}
		`

	const [ error, setError ] = useState<Error>(new Error())

	const onCompleted = ({ signIn }: { signIn: { bearer: string, token: string } }) => setAuth(signIn)
		, onError = (apolloError: ApolloError) => setError(new Error({ apolloError }))

	const [ serverSignIn, { loading } ] = useMutation(SIGNIN, { onCompleted, onError })

	const onSubmit = (data: ISignInData) => serverSignIn({ variables: { data }})

	return { loading, error, onSubmit }
}

function SignIn() {
	const { loading, error, onSubmit } = useSignIn()

	return (
		<div className='signin'>
			<Form<ISignInData> onSubmit={ onSubmit }>
				<div className='signin-header'>

				</div>
				<div className='signin-body'>
					<Input type='text' name='userName' label='Nombre de usuario' />
					<Input type='password' name='password' label="Contraseña" />

					<input type='submit' value='Iniciar sesión'/>
				</div>
				<div className='signin-footer'>

				</div>
			</Form>

			<Loader show={ loading }/>
			<ErrorDialog error={ error } />
		</div>
	)
}

export default SignIn
