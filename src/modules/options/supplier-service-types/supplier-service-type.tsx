
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { IconAdd } from '../../../components/icons'

import { Loader, ErrorDialog, Table, ToolBar, ToolBarMenu, ToolBarAction, ToolBarSearch } from '../../../components'
import { useError } from '../../../hooks'
import SupplierServiceUpsert from './supplier-service-upsert'


type TSupplierServiceType = {
	id:		string
	name:	string
}

function useSupplierServiceTypes() {
	const SUPPLIER_SERVICE_TYPES = gql`
			query SupplierServiceTypes {
				supplierServiceTypes {
					id name
				}
			}
		`

	const [ error, onError ] = useError(), [ upsert, setUpsert ] = useState(false)

	const { loading, data } = useQuery<{ supplierServiceTypes: Array<TSupplierServiceType> }>(SUPPLIER_SERVICE_TYPES, { onError })
	
	const openUpsert = () => setUpsert(true)
		, closeUpsert = () => setUpsert(false)

	return { loading, dataset: data?.supplierServiceTypes || [], error, upsert, openUpsert, closeUpsert }
}

function SupplierServiceTypes() {
	const { loading, error, dataset, upsert, openUpsert, closeUpsert } = useSupplierServiceTypes()

	return (
		<div>
			<h2>Tipos de Servicio - Proveedores</h2>
			<div>
			<ToolBar>
					<ToolBarMenu>
                        <ToolBarSearch onSearch={ ()=>{} }/>
					</ToolBarMenu>
					<ToolBarMenu>
						<ToolBarAction action={ openUpsert }>
							<IconAdd></IconAdd>
						</ToolBarAction>
					</ToolBarMenu>
				</ToolBar>
			</div>
			<div>
				<Table<TSupplierServiceType>
					columns={['No', 'Nombre']}
					rows={[
						(_, i) => i + 1, r => r.name
					]}
					dataset={ dataset }
				>
				</Table>
			</div>

			<Loader show={loading}/>
			<ErrorDialog error={ error }/>
			<SupplierServiceUpsert open={ upsert } onClose={ closeUpsert } />
		</div>
	)
}

export default SupplierServiceTypes
