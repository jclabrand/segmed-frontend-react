
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'

import './sidenav.css'


type SideNavProps = {
	children: ReactNode
}

function SideNav(props: SideNavProps) {
	return (
		<div className='sidenav'>
			{ props.children }
		</div>
	)
}

export default SideNav
