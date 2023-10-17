
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { useEffect, useState } from 'react'

import { Error } from '../../utils'

import Dialog from './dialog'
import DialogHeader from './dialog-header'
import DialogContent from './dialog-content'
import DialogFooter from './dialog-footer'


type ErrorDialogProps = {
	error:	Error
}

function useErrorDialog(props: ErrorDialogProps) {
	const [ open, setOpen  ] = useState(false)

	const close = () => setOpen(false)

	useEffect(() => {
		setOpen(props.error.has)
	}, [props.error])

	return { open, close }
}

function ErrorDialog(props: ErrorDialogProps) {
	const { open, close } = useErrorDialog(props)

	return (
		<Dialog open={ open }>
			<DialogHeader title='Error' />
			<DialogContent>
				<p>{ props.error.message }</p>
			</DialogContent>
			<DialogFooter>
				<button className='dialog-cancel' onClick={ close }>Cancelar</button>
				<button className='dialog-error-action' onClick={ close }>Aceptar</button>
			</DialogFooter>
		</Dialog>
	)
}

export default ErrorDialog
