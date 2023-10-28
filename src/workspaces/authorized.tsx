
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { gql, useMutation, useReactiveVar, ApolloError } from '@apollo/client'

import { Error } from '../utils'
import { authState, userState, setAuth, getDefaultUser } from '../app/client'
import { Loader, NavAction, NavBar, NavBrand, NavMenu, NavUser, NavUserAction, NavUserLink, SideNav, SideNavMenu, SideNavLink } from '../components'
import { Home, NotFound } from '../modules/basic'
import { Roles, Users } from '../modules/settings'
import { Suppliers } from '../modules/parameters'
import { SupplierServiceTypes, SupplierSpecialtyTypes } from '../modules/options'

import { IconMenu } from '../components/icons'
//import SupplierSpecialtyTypes from '../modules/options/supplier-specialty-types/supplier-specialty-types'


function useAuthorized() {
	const SIGNOUT = gql`
			mutation SignOut($bearer: String!) {
				signOut(bearer: $bearer)
			}
		`

	const user = useReactiveVar(userState)
		, auth = useReactiveVar(authState)
		, mainRef = useRef<HTMLDivElement>(null)

	const [ error, setError ] = useState<Error>(new Error())

	const onCompleted = () => {
			setAuth({ bearer: '', token: '' })
			userState(getDefaultUser())
		}
		, onError = (apolloError: ApolloError) => setError(new Error({ apolloError }))

	const [ serverSignOut, { loading } ] = useMutation(SIGNOUT, { onCompleted, onError })

	const signOut = () => serverSignOut({ variables: { bearer: auth.bearer } })
		, toggleSide = () => {
			if (mainRef.current) mainRef.current.className = mainRef.current.className === 'workspace-flat' ? 'workspace-split' : 'workspace-flat'
		}

	return { loading, error, user, signOut, toggleSide, mainRef }
}

function Authorized() {
	const { loading, error, user, signOut, toggleSide, mainRef } = useAuthorized()

	return (
		<>
			<header>
				<NavBar>
					<NavMenu>
						<NavAction action={ toggleSide }>
							<IconMenu/>
						</NavAction>
						<NavBrand>
							<h4 className='segmed-brand'>Seguro Médico - SEGMED</h4>
						</NavBrand>
					</NavMenu>
					<NavMenu>
						<NavUser user={ user }>
							<NavUserLink to='/' text='Configurar cuenta'/>
							<NavUserAction action={ signOut } text='Cerrar sesión'/>
						</NavUser>
					</NavMenu>
				</NavBar>
			</header>
			<div ref={ mainRef } className='workspace-split'>
				<aside>
					<SideNav>
						<SideNavMenu text='Configuración'>
							<SideNavLink text='Roles' to='/configuracion/roles'/>
							<SideNavLink text='Usuarios' to='/configuracion/usuarios'/>
						</SideNavMenu>
						<SideNavMenu text='Opciones'>
							<SideNavLink text='Tipos de sercicios proveedores' to='/opciones/tipos-sercicios-proveedores'/>
							<SideNavLink text='Tipos de especialidades proveedores' to='/opciones/tipos-especialidades-proveedores'/>
						</SideNavMenu>
						<SideNavMenu text='Parámetros'>
							<SideNavLink text='Proveedores' to='/parametros/proveedores'/>
							<SideNavLink text='Beneficiarios' to='/'/>
						</SideNavMenu>
						<SideNavMenu text='Servicios'>
							<SideNavLink text='Farmacia' to='/'/>
							<SideNavLink text='Consultorio' to='/'/>
						</SideNavMenu>
					</SideNav>
				</aside>
				<main>
					<Routes>
						<Route path="/" element={ <Home/> } />

						<Route path="configuracion">
							<Route path="roles" element={ <Roles/> } />
							<Route path="usuarios" element={ <Users/> } />
						</Route>

						<Route path='opciones'>
							<Route path='tipos-sercicios-proveedores' element={ <SupplierServiceTypes/> } />
							<Route path='tipos-especialidades-proveedores' element={ <SupplierSpecialtyTypes/> } />
							
						</Route>

						<Route path='parametros'>
							<Route path='proveedores' element={ <Suppliers/> } />
						</Route>

						<Route path="*" element={ <NotFound/> } />
					</Routes>

					<Loader show={loading}/>

					{ error.has && <div>{ error.message }</div>}
				</main>
			</div>
		</>
	)
}

export default Authorized
