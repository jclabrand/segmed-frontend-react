
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'


type DialogFooterProps = {
	children:	ReactNode
}

function DialogFooter(props: DialogFooterProps) {
	return (
		<div className='dialog-footer'>
			{ props.children }
		</div>
	)
}

export default DialogFooter
