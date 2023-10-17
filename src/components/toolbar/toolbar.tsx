
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'

import './toolbar.css'


type ToolBarProps = {
	children: ReactNode
}

function ToolBar(props: ToolBarProps) {
	return (
		<div className="toolbar">
			{ props.children }
		</div>
	)
}

export default ToolBar
