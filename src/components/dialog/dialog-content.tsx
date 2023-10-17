
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'


type DialogContentProps = {
	children:	ReactNode
	visible:	boolean
}

function DialogContent(props: DialogContentProps) {
	return (
		<div className='dialog-content'>
			{ props.visible && props.children }
		</div>
	)
}

DialogContent.defaultProps = {
	visible: true
}

export default DialogContent
