
import { gql, useQuery } from '@apollo/client'

import { Loader, ErrorDialog, Table, ToolBar, ToolBarMenu, ToolBarSearch } from '../../../components'
import { useError } from '../../../hooks'

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

	const [ error, onError ] = useError()

	const { loading, data } = useQuery<{ supplierServiceTypes: Array<TSupplierServiceType> }>(SUPPLIER_SERVICE_TYPES, { onError })
	
	return { loading, dataset: data?.supplierServiceTypes || [], error }
}

function SupplierServiceTypes() {
	const { loading, dataset, error } = useSupplierServiceTypes()

	return (
		<div>
			<h2>Tipos de servicio de los proveedores</h2>
			<div>
				<ToolBar>
					<ToolBarMenu>
						<ToolBarSearch onSearch={ ()=>{} }/>
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
		</div>
	)
}

export default SupplierServiceTypes
