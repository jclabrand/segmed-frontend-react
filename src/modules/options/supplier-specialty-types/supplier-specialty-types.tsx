
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { IconAdd } from '../../../components/icons'
import { Loader, ErrorDialog, Table, ToolBar, ToolBarMenu, ToolBarAction, ToolBarSearch } from '../../../components'
import { useError } from '../../../hooks'
import SupplierSpecialtyUpsert from './supplier-specialty-upsert'

type TSupplierSpecialtyType = {
	id:		string
	name:	string
}

function useSupplierSpecialtyTypes() {
	const SUPPLIER_SPECIALTY_TYPES = gql`
        query SupplierSpecialtyTypes {
            supplierSpecialtyTypes {
            id name  
            }
      }
		`

	const [ error, onError ] = useError(), [ upsert, setUpsert ] = useState(false)

	const { loading, data } = useQuery<{ supplierSpecialtyTypes: Array<TSupplierSpecialtyType> }>(SUPPLIER_SPECIALTY_TYPES, { onError })
	
    const openUpsert = () => setUpsert(true)
		, closeUpsert = () => setUpsert(false)

	return { loading, dataset: data?.supplierSpecialtyTypes || [], error, upsert, openUpsert, closeUpsert }
}

function SupplierSpecialtyTypes() {
	const { loading, dataset, error, openUpsert, upsert, closeUpsert } = useSupplierSpecialtyTypes()

	return (
		<div>
			<h2>Tipos de Especialidades - Proveedores</h2>
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
				<Table<TSupplierSpecialtyType>
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
            <SupplierSpecialtyUpsert open={ upsert } onClose={ closeUpsert } />
		</div>
	)
}

export default SupplierSpecialtyTypes
