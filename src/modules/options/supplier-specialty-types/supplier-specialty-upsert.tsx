
import { gql, useMutation } from '@apollo/client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, ErrorDialog, Form, Input, Loader } from '../../../components'
import { useError } from '../../../hooks'

import './supplier-specialty-upsert.css'


type SupplierSpecialtyUpsertProps = {
	open: boolean
	onClose?: () => void
}

interface ISuplierSpecialtyInput {
	supplierName: string
}

function useSupplierSpecialtyUpsert(props: SupplierSpecialtyUpsertProps) {
	const CREATE = gql`
        mutation CreateSupplierSpecialtyType($data: ISupplierSpecialtyTypeArgs!) {
            createSupplierSpecialtyType(data: $data) {
            id name  
            }
        }
		`

	const [ error, onError ] = useError()

	const [ create, { loading: creating } ] = useMutation(CREATE, { onCompleted: () => close(), onError })

	const submit = (data: ISuplierSpecialtyInput) => {
			create ({ variables: { data: { name: data.supplierName} }})
		}
		, close = () => props.onClose?.()

	return { error, creating, submit, close }
}


function SupplierSpecialtyUpsert(props: SupplierSpecialtyUpsertProps) {
	const { error, creating, submit, close } = useSupplierSpecialtyUpsert(props)

	return (
		<div>
			<Dialog className='supplier-specialty-upsert' open={ props.open }>
				<Form<ISuplierSpecialtyInput> onSubmit={ submit }>
					<DialogHeader title='Crear Tipo de Especialidad [Proveedores]'/>
					<DialogContent visible={ props.open }>
						<Input type='text' name='supplierName' label='Nombre del tipo de Especialidad'/>
					</DialogContent>
					<DialogFooter>
						<button type='button' className='dialog-cancel' onClick={ close }>Cancelar</button>
						<button type='submit' className='dialog-action'>Guardar</button>
					</DialogFooter>
				</Form>
			</Dialog>

			<Loader show={ creating }/>
			<ErrorDialog error={ error } />
		</div>
	)
}

export default SupplierSpecialtyUpsert
