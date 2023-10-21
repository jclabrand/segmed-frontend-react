
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactElement, useEffect, useRef, useState } from 'react'


export interface TableCellCallback<TData> {
	(row: TData, index: number): ReactElement | string | number | boolean
}

type TableRowProps<TData> = {
	rows:	TableCellCallback<TData>[]
	item:	TData
	index:	number
}

function useTableRow() {
	const [ visible, setVisible ] = useState(false)

	const observe: IntersectionObserverCallback = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				setVisible(true)
				observer.disconnect()
			}
		})
	}

	const lazy = useRef<HTMLTableSectionElement>(null)
		, io = useRef(new IntersectionObserver(observe))

	useEffect(() => {
		if (lazy.current)
			io.current.observe(lazy.current)
		
		return () => {}
	}, [])

	return { lazy, visible }
}

export function TableRow<TData>(props: TableRowProps<TData>) {
	const { lazy, visible } = useTableRow()

	return (
		<tbody ref={ lazy }>
			<tr>
				{
					visible
						? props.rows.map((cell, j) => {
							return (<td key={j}>{ cell(props.item, props.index) }</td>)
						})
						: <td></td>
				}
			</tr>
		</tbody>
	)
}
