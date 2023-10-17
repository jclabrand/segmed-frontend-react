
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'

// import './toolbar.css'


type ToolBarActionProps = {
	children:	ReactNode,
	action:		() => void
}

function ToolBarAction(props: ToolBarActionProps) {
	return (
		<li className="toolbar-action">
			<a onClick={ props.action }>
				{ props.children }
			</a>
		</li>
	)
}

export default ToolBarAction
