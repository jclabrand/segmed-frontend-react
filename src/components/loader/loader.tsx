
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { useDialog } from '../../hooks'
import './loader.css'


type LoaderProps = {
	show: boolean
}

function Loader(props: LoaderProps) {
	const [ dialogRef ] = useDialog(props.show)

	return (
		<dialog ref={ dialogRef } className='loader-dialog'>
			<div className='loader'><div></div><div></div><div></div></div>
		</dialog>
	)
}

Loader.defaultProps = {
	show: true
}

export default Loader
