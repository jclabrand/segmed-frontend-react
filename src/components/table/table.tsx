
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { ReactNode } from 'react'

import { TableRow, TableCellCallback } from './table-row'
import './table.css'


type TableProps<TData> = {
	children?:	ReactNode
	columns:	string[]
	rows:		TableCellCallback<TData>[]
	dataset:	TData[]
}

function Table<TData>(props: TableProps<TData>) {
	
	return (
		<div className='table'>
			<table>
				<thead>
					<tr>
						{ props.columns.map((col, i) => (<th key={i}>{ col }</th>)) }
					</tr>
				</thead>
				
				{ props.dataset.map((item, i) => (<TableRow<TData> key={i} index={i} item={item} rows={props.rows}/>)) }

			</table>
		</div>
	)
}

Table.defaultProps = {
	rows: [],
	dataset: []
}

export default Table
