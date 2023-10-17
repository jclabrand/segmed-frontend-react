
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'

import './nav-brand.css'


type NavBrandProps = {
	children: ReactNode
}

function NavBrand(props: NavBrandProps) {
	return (
		<li>
			<div className='nav-brand'>
				{ props.children }
			</div>
		</li>
	)
}

export default NavBrand
