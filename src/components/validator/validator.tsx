
import { useEffect, useState } from 'react'
import { TValidator } from '../types'

import './validator.css'


type ValidatorProps<TData> = {
	value:		TData
	validators:	Array<TValidator<TData>>
}

function useValidator<TData>(props: ValidatorProps<TData>) {
	const [ result, setResult ] = useState({ valid: true, message: '' })

	useEffect(() => {
		let res = { valid: true, message: '' }

		for(const ref in props.validators) {
			const val = props.validators[ref]
			if (val.validate(props.value)) continue

			res = { valid: false, message: val.message }
			break
		}

		setResult(res)
	}, [ props.value, props.validators ])

	return result
}

function Validator<TData = string>(props: ValidatorProps<TData>) {
	const { valid, message} = useValidator(props)

	return !valid ? (
		<div className='validator'>
			<div><span>{ message }</span></div>
		</div>
	) : null
}

Validator.defaultProps = {
	validators: []
}

export default Validator
