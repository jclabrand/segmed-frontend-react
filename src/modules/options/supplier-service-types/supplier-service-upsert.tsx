
import { gql, useMutation } from '@apollo/client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, ErrorDialog, Form, Input, Loader } from '../../../components'
import { useError } from '../../../hooks'
import { TSupplierServiceType } from './types'

import './supplier-service-upsert.css'


type SupplierServiceUpsertProps = {
	open: string
	data: TSupplierServiceType | null
	onClose?: () => void
}

interface ISuplierServiceInput {
	name: string
}

function useSupplierServiceUpsert(props: SupplierServiceUpsertProps) {
	const CREATE = gql`
			mutation createSupplierServiceType($data: ISupplierServiceTypeArgs!) {
				createSupplierServiceType(data: $data) {
					id name
				}
			}
		`
	const UPDATE = gql`
			mutation m($id: String!, $data: ISupplierServiceTypeArgs!) {
				updateSupplierServiceType(id: $id, data: $data) {
					id
				}
			}
		`

	const [ error, onError ] = useError()

	const [ create, { loading: creating } ] = useMutation(CREATE, { onCompleted: () => close(), onError })
	const [ update, { loading: updating } ] = useMutation(UPDATE, { onCompleted: () => close(), onError })

    
	const submit = (data: ISuplierServiceInput) => {
			if(props.open === 'insert')
				create({ variables: { data } })
			if(props.open === 'update')
				update({ variables: { id: props.data?.id, data } })
			if(props.open === 'delete')
				update({ variables: { id: props.data?.id } })
		}
		, close = () => props.onClose?.()

	return {
		error,
		loading: creating || updating,
		visible: props.open === 'insert' ||  props.open === 'update' || props.open === 'delete',
		title: props.open === 'insert' ? 'Crear Tipo de Servicio [Proveedores]' : 'Editar Tipo de Servicio [Proveedores]',
		submit,
		close
	}
}


function SupplierServiceUpsert(props: SupplierServiceUpsertProps) {
	const { error, loading, visible, title, submit, close } = useSupplierServiceUpsert(props)

	return (
		<div>
			<Dialog className='supplier-service-upsert' open={ visible }>
				<Form<ISuplierServiceInput> onSubmit={ submit }>
					<DialogHeader title={ title }/>
					<DialogContent visible={ visible }>
						{
							props.open === 'delete'
								?
								<div>
									<h4>Confirme para eliminar el registro</h4>
								</div>
								:
								<div>
									<Input type='text' name='name' label='Nombre del tipo de Servicio'/>
								</div>
						}
					</DialogContent>
					<DialogFooter>
						<button type='button' className='dialog-cancel' onClick={ close }>Cancelar</button>
						<button type='submit' className='dialog-action'>Guardar</button>
					</DialogFooter>
				</Form>
			</Dialog>

			<Loader show={ loading }/>
			<ErrorDialog error={ error } />
		</div>
	)
}

export default SupplierServiceUpsert
