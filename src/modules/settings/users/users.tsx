
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { useState } from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client'

import { Loader, ErrorDialog, Table, ToolBar, ToolBarMenu, ToolBarAction, ToolBarSearch } from '../../../components'
import { IconAdd } from '../../../components/icons'
import { useError, useFilter } from '../../../hooks'
import { TUser } from '../../../app/types'

import UserUpsert from './user-upsert'


function useUsers() {
	const USERS = gql`
			query Users {
				users {
					id userName displayName email active
				}
			}
		`
		, USER_CREATED = gql`
			subscription UserAdded {
				userAdded {
					id
				}
			}
		`
	const [ upsert, setUpsert ] = useState(false)
		, [ error, onError ] = useError()

	const { loading, data, refetch } = useQuery<{ users: TUser[] }>(USERS, { onError })

	useSubscription(USER_CREATED, { onData: () => refetch() })

	const openUpsert = () => setUpsert(true)
		, closeUpsert = () => setUpsert(false)

	return { loading, error, users: data?.users || [], upsert, openUpsert, closeUpsert }
}

function Users() {
	const { loading, error, users, upsert, openUpsert, closeUpsert } = useUsers()
		, [ fusers, filter ] = useFilter<TUser>(users, ['userName', 'displayName'])

	return (
		<div>
			<div>
				<ToolBar>
					<ToolBarMenu>
						<ToolBarSearch onSearch={ filter } />
					</ToolBarMenu>
					<ToolBarMenu>
						<ToolBarAction action={ openUpsert }>
							<IconAdd></IconAdd>
						</ToolBarAction>
					</ToolBarMenu>
				</ToolBar>
			</div>
			<div>
				<Table<TUser>
					columns={['Usuario', 'Estado', 'Nombre', 'E-Mail', 'Permisos', 'Fecha de creación']}
					rows={[
						(u) => u.userName,
						u => u.active,
						u => u.displayName || '',
						u => u.email || '',
						() => '', () => ''
					]}
					dataset={ fusers }
				>
				</Table>
			</div>

			<UserUpsert open={ upsert } onClose={ closeUpsert } />
			<Loader show={ loading }/>
			<ErrorDialog error={ error } />
		</div>
	)
}

export default Users
