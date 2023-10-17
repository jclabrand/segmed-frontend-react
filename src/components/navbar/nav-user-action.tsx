
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'


type NavUserActionProps = {
	children?:	ReactNode,
	text?:		string,
	action:		() => void
}

function NavUserAction(props: NavUserActionProps) {
	const { action, children, text} = props

	return (
		<li>
			<a className='nav-user-link'onClick={ action }>
				{ children }
				<span>{ text }</span>
			</a>
		</li>
	)
}

export default NavUserAction
