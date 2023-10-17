
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { RefObject, useEffect, useRef, useState } from 'react'


function useIntersectOnClick<THTMLElement>(callback?: (node?: HTMLElement) => void): [RefObject<THTMLElement>, boolean] {
	const ref = useRef<HTMLElement>(null)
		, [ intersect, setIntersect ] = useState(false)

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current) {
				const pos = ref.current.compareDocumentPosition(<Node>event.target)

				if (ref.current.contains(<Node>event.target) || (pos === 35) || (pos === 37)) {
					setIntersect(true)
					callback?.(ref.current)
				} else {
					setIntersect(false)
				}
			}
		}
		
		window.addEventListener('click', handleClick)

		return () => window.removeEventListener('click', handleClick)
	}, [ref, callback])

	return [ <RefObject<THTMLElement>>ref, intersect ]
}

export default useIntersectOnClick
