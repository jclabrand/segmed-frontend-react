
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import './nav-link.css'


type NavLinkProps = {
	children?:	ReactNode,
	text?:		string,
	to:			string
}

function NavLink(props: NavLinkProps) {
	const { to, text, children } = props

	return (
		<li>
			<Link className={ text ? 'nav-link-text' : 'nav-link' } to={ to }>
				{ children }
				<span>{ text }</span>
			</Link>
		</li>
	)
}

export default NavLink
