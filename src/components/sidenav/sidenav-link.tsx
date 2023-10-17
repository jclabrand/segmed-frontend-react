
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { Link } from 'react-router-dom'

import './sidenav-link.css'


type NavLinkProps = {
	text:	string,
	to:		string
}

function SideNavLink(props: NavLinkProps) {
	const { to, text } = props

	return (
		<li>
			<Link className='sidenav-link' to={ to }>
				<span>{ text }</span>
			</Link>
		</li>
	)
}

export default SideNavLink
