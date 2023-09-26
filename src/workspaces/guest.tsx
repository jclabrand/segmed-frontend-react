
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { Routes, Route } from 'react-router-dom'

import { Home, NotFound } from '../modules/basic'
import { SignIn } from '../modules/account'


export function Guest() {

	return (
		<>
			<header>

			</header>
			<main>
				<div>Invitado - Seguro médico</div>

				<Routes>
					<Route path="/" element={ <Home/> } />

					<Route path="*" element={ <NotFound/> } />
				</Routes>

				<SignIn />
			</main>
		</>
	)
}
