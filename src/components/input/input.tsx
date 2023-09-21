
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


type InputProps = {
	name: string
	type: string
	label?: string
}

function Input({ name, type, label }: InputProps) {
	return (
		<div>
			<input type={ type } name={ name }/>
			{ label && <label htmlFor={ name }>{ label }</label>}
		</div>
	)
}

export default Input
