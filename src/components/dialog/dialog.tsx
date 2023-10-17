
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'

import { useDialog } from '../../hooks'
import './dialog.css'


type DialogProps = {
	open:		boolean
	className?:	string
	children?:	ReactNode
}

function Dialog(props: DialogProps) {
	const [ dialogRef ] = useDialog(props.open)

	return (
		<dialog ref={ dialogRef } className={ `dialog ${props.className}` }>
			{ props.children }
		</dialog>
	)
}

export default Dialog
