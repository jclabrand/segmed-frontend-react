
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'

import './nav-menu.css'


type NavMenuProps = {
	children: ReactNode
}

function NavMenu(props: NavMenuProps) {
	return (
		<ul className='nav-menu'>
			{ props.children }
		</ul>
	)
}

export default NavMenu
