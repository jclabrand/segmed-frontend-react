
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import './nav-user-link.css'


type NavUserLinkProps = {
	children?:	ReactNode,
	text?:		string,
	to:			string
}

function NavUserLink(props: NavUserLinkProps) {
	const { to, text } = props

	return (
		<li>
			<Link className='nav-user-link' to={ to }>
				<span>{ text }</span>
			</Link>
		</li>
	)
}

export default NavUserLink
