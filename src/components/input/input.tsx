
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ChangeEvent, useState } from 'react'

import { TValidator } from '../types'
import { Validator } from '..'

import './input.css'


type InputProps = {
	name:	string
	type:	string
	label?:	string
	validate: Array<TValidator<string>>
}

function useInput() {
	const [ value, setValue ] = useState('')

	const onChange = ({ target }: ChangeEvent<HTMLInputElement>)=> {
		setValue(target.value)
	}

	return { value, onChange }
}

function Input({ name, type, label, validate }: InputProps) {
	const { value, onChange } = useInput()

	return (
		<div className='input-group'>
			<input type={ type } name={ name } value={ value } onChange={ onChange }/>
			{ label && <label htmlFor={ name }>{ label }</label> }
			<Validator validators={ validate } value={ value }/>
		</div>
	)
}

Input.defaultProps = {
	validate: []
}

export default Input
