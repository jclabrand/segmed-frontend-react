
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


// import { gql, useQuery, useSubscription } from '@apollo/client'

import { ErrorDialog, Loader, Table, ToolBar, ToolBarAction, ToolBarMenu } from '../../../components'
import { IconAdd } from '../../../components/icons'
import { useError } from '../../../hooks'
import { TRole } from '../../../app/types'


function useRoles() {
	const [ error ] = useError()

	return { loading: false, error, roles: [] }
}

function Roles() {
	const { loading, error, roles } = useRoles()

	return (
		<div>
			<div>
				<ToolBar>
					<ToolBarMenu>

					</ToolBarMenu>
					<ToolBarMenu>
						<ToolBarAction action={ () => {} }>
							<IconAdd/>
						</ToolBarAction>
					</ToolBarMenu>
				</ToolBar>
			</div>
			<div>
				<Table<TRole>
					columns={['No', 'Nombre', 'Descripción', 'Permisos', 'Miembros', 'Historial']}
					rows={[
						(_, i) => i, (r) => r.name, r => r.description || '', () => '', () => '', () => ''
					]}
					dataset={ roles }
				/>
			</div>

			<Loader show={loading}/>
			<ErrorDialog error={ error } />
		</div>
	)
}

export default Roles
