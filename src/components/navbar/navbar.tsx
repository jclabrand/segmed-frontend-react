
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'

import './navbar.css'


type NavBarProps = {
	children: ReactNode
}

function NavBar(props: NavBarProps) {
	return (
		<nav>
			<div className='navbar' role='nav'>
				{ props.children }
			</div>
		</nav>
	)
}

export default NavBar
