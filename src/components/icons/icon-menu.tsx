
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { TIconProps } from './types'


function IconMenu(props: TIconProps) {
	const { className } = props

	return (
		<svg viewBox="0 0 24 24" className={ className }>
			<path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
		</svg>
	)
}

export default IconMenu
