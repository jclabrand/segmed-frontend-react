
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode, SyntheticEvent } from 'react'


type FormProps<TData> = {
	children: ReactNode
	onSubmit?: (data: TData) => void
}

function useForm<TData>(props: FormProps<TData>) {
	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault()

		const data: TData = Object.fromEntries(
			new FormData(e.target as HTMLFormElement)
		) as TData

		props.onSubmit?.(data)
	}

	return {
		onSubmit
	}
}

function Form<TData>(props: FormProps<TData>) {
	const { onSubmit } = useForm<TData>(props)

	return (
		<form onSubmit={ onSubmit }>
			{ props.children }
		</form>
	)
}

export default Form
