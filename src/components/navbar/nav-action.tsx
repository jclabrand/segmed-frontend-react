
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'


type NavActionProps = {
	children?:	ReactNode,
	text?:		string,
	action:		() => void
}

function NavAction(props: NavActionProps) {
	const { action, children, text} = props

	return (
		<li>
			<a className='nav-link' onClick={ action }>
				{ children }
				<span>{ text }</span>
			</a>
		</li>
	)
}

export default NavAction
