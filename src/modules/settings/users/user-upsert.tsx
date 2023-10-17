
import { gql, useMutation } from '@apollo/client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, ErrorDialog, Form, Input, Loader } from '../../../components'
import { useError } from '../../../hooks'

import './user-upsert.css'


type UserUpsertProps = {
	open: boolean
	onClose?: () => void
}

interface IUserInput {
	userName: string
}

function useUserUpsert(props: UserUpsertProps) {
	const CREATE = gql`
			mutation CreateUser($data: IUserCreateArgs!) {
				createUser(data: $data) { id }
			}
		`

	const [ error, onError ] = useError()

	const [ create, { loading: creating } ] = useMutation(CREATE, { onCompleted: () => close(), onError })

	const submit = (data: IUserInput) => {
			create({ variables: { data }})
		}
		, close = () => props.onClose?.()

	return { error, creating, submit, close }
}


function UserUpsert(props: UserUpsertProps) {
	const { error, creating, submit, close } = useUserUpsert(props)

	return (
		<div>
			<Dialog className='user-upsert' open={ props.open }>
				<Form<IUserInput> onSubmit={ submit }>
					<DialogHeader title='Crear usuario'/>
					<DialogContent visible={ props.open }>
						<Input type='text' name='userName' label='Nombre de usuario'/>
						<Input type='text' name='displayName' label='Nombre para mostrar'/>
						<Input type='email' name='email' label='Correo electrónico'/>
					</DialogContent>
					<DialogFooter>
						<button type='button' className='dialog-cancel' onClick={ close }>Cancelar</button>
						<button type='submit' className='dialog-action'>Aceptar</button>
					</DialogFooter>
				</Form>
			</Dialog>

			<Loader show={ creating }/>
			<ErrorDialog error={ error } />
		</div>
	)
}

export default UserUpsert
