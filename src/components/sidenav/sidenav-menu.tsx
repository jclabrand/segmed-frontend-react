
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'

import './sidenav-menu.css'


type SideNavMenuProps = {
	text:		string
	children:	ReactNode
}

function SideNavMenu(props: SideNavMenuProps) {
	return (
		<div className="sidenav-menu">
			<a>{ props.text }</a>
			<ul>
				{ props.children }
			</ul>
		</div>
	)
}

export default SideNavMenu
