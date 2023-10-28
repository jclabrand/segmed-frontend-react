
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { IconAdd, IconEdit, IconMenu } from '../../../components/icons'

import { Loader, ErrorDialog, Table, ToolBar, ToolBarMenu, ToolBarAction, ToolBarSearch } from '../../../components'
import { useError } from '../../../hooks'
import SupplierServiceUpsert from './supplier-service-upsert'
import { TSupplierServiceType } from './types'


function useSupplierServiceTypes() {
	const SUPPLIER_SERVICE_TYPES = gql`
			query SupplierServiceTypes {
				supplierServiceTypes {
					id name
				}
			}
		`

	const [ error, onError ] = useError()
		, [ upsert, setUpsert ] = useState('')
		, [ updateData, setUpdateData ] = useState<TSupplierServiceType | null>(null)

	const { loading, data } = useQuery<{ supplierServiceTypes: Array<TSupplierServiceType> }>(SUPPLIER_SERVICE_TYPES, { onError })
	
	const openUpsert = (option: string, row: TSupplierServiceType | null) => () => {
			setUpsert(option)
			setUpdateData(row)
		}
		, closeUpsert = () => setUpsert('')

	return { loading, dataset: data?.supplierServiceTypes || [], error, upsert, openUpsert, closeUpsert, updateData }
}

function SupplierServiceTypes() {
	const { loading, error, dataset, upsert, openUpsert, closeUpsert, updateData } = useSupplierServiceTypes()

	return (
		<div>
			<h2>Tipos de Servicio - Proveedores</h2>
			<div>
				<ToolBar>
					<ToolBarMenu>
						<ToolBarSearch onSearch={ ()=>{} }/>
					</ToolBarMenu>
					<ToolBarMenu>
						<ToolBarAction action={ openUpsert('insert', null) }>
							<IconAdd/>
						</ToolBarAction>
					</ToolBarMenu>
				</ToolBar>
			</div>
			<div>
				<Table<TSupplierServiceType>
					columns={['No', 'Nombre', 'opciones']}
					rows={[
						(_, i) => i + 1,
						r => r.name,
						r => <div>
							<button type='button' className='table-btn' onClick={ openUpsert('update', r) }>
								<IconEdit/>
							</button>
							<button type='button' className='table-btn' onClick={ openUpsert('delete', r) }>
								<IconMenu/>
							</button>
						</div>
					]}
					dataset={ dataset }
				>
				</Table>
			</div>

			<Loader show={loading}/>
			<ErrorDialog error={ error }/>
			<SupplierServiceUpsert open={ upsert } data={ updateData } onClose={ closeUpsert } />
		</div>
	)
}

export default SupplierServiceTypes
