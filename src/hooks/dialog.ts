
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { RefObject, useEffect, useRef } from 'react'


function useDialog(open: boolean): [RefObject<HTMLDialogElement>] {
	const ref = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		if (!ref.current) return

		if (open)
			ref.current.showModal()
		else
			ref.current.close()
	}, [open, ref])

	return [ ref ]
}

export default useDialog
