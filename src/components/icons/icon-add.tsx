
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { TIconProps } from './types'


function IconAdd(props: TIconProps) {
	const { className } = props

	return (
		<svg viewBox="0 0 24 24" className={ className }>
			<path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
		</svg>
	)
}

export default IconAdd
