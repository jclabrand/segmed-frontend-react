
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'

// import './toolbar.css'


type ToolBarMenuProps = {
	children: ReactNode
}

function ToolBarMenu(props: ToolBarMenuProps) {
	return (
		<ul className="toolbar-menu">
			{ props.children }
		</ul>
	)
}

export default ToolBarMenu
