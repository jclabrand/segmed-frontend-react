
import { gql, useMutation } from '@apollo/client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, ErrorDialog, Form, Input, Loader } from '../../../components'
import { useError } from '../../../hooks'

import './supplier-service-upsert.css'


type SupplierServiceUpsertProps = {
	open: boolean
	onClose?: () => void
}

interface ISuplierServiceInput {
	supplierName: string
}

function useSupplierServiceUpsert(props: SupplierServiceUpsertProps) {
	const CREATE = gql`
        mutation createSupplierServiceType($data: ISupplierServiceTypeArgs!) {
            createSupplierServiceType(data: $data) {
            id name  
            }
        }
		`

	const [ error, onError ] = useError()

	const [ create, { loading: creating } ] = useMutation(CREATE, { onCompleted: () => close(), onError })

    
	const submit = (data: ISuplierServiceInput) => {
			create(data)
		}
		, close = () => props.onClose?.()

	return { error, creating, submit, close }
}


function SupplierServiceUpsert(props: SupplierServiceUpsertProps) {
	const { error, creating, submit, close } = useSupplierServiceUpsert(props)

	return (
		<div>
			<Dialog className='supplier-service-upsert' open={ props.open }>
				<Form<ISuplierServiceInput> onSubmit={ submit }>
					<DialogHeader title='Crear Tipo de Servicio [Proveedores]'/>
					<DialogContent visible={ props.open }>
						<Input type='text' name='supplierName' label='Nombre del tipo de Servicio'/>
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

export default SupplierServiceUpsert
