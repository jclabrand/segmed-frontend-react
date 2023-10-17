
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'

import { TUser } from '../../app/types'
import { useIntersectOnClick } from '../../hooks'

import './nav-user.css'


type NavLinkProps = {
	children?:	ReactNode,
	user:		TUser
}

function NavUser(props: NavLinkProps) {
	const { userName, displayName, email } = props.user
		, [ dropdownRef, dropdownOpen ] = useIntersectOnClick<HTMLLIElement>()

	return (
		<li ref={ dropdownRef }>
			<div  className='nav-user'>
				<span>{ userName.toUpperCase()[0] }</span>
			</div>
			<div className={ dropdownOpen ? 'nav-user-menu-visible' : 'nav-user-menu' }>
				<div className='nav-user-header'>
					<div className="nav-user-email">
						<span>{ email || '(Sin correo eléctronico)' }</span>
					</div>
					<div className='nav-user-pic'>
						<span>{ userName.toUpperCase()[0] }</span>
					</div>
					<div className="nav-user-name">
						<span>{ displayName || '(Sin Nombre)' }</span>
					</div>
				</div>
				<ul className='nav-user-options'>
					{ props.children }
				</ul>
			</div>
		</li>
	)
}

export default NavUser
