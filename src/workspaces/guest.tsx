
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { Routes, Route } from 'react-router-dom'

import { Home, NotFound } from '../modules/basic'
import { NavBar, NavBrand, NavLink , NavMenu } from '../components'
import { SignIn } from '../modules/account'


export function Guest() {

	return (
		<>
			<header>
				<NavBar>
					<NavMenu>
						<NavBrand>
							<h4 className='segmed-brand'>Seguro Médico - SEGMED</h4>
						</NavBrand>
					</NavMenu>
					<NavMenu>

					</NavMenu>
					<NavMenu>
						<NavLink to='iniciar' text='Iniciar sesión' />
					</NavMenu>
				</NavBar>
			</header>
			<main>
				<Routes>
					<Route path="/" element={ <Home/> } />

					<Route path="/iniciar" element={ <SignIn/> } />

					<Route path="*" element={ <NotFound/> } />
				</Routes>
			</main>
		</>
	)
}
