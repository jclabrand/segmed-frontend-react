
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import { useState } from 'react'


function useFilter<TData extends object>(dataset: Array<TData>, fields: Array<string>): [ Array<TData>, (query: string) => void ] {

	const [ filterText, setFilterText ] = useState('')
	const filter = (query: string) => setFilterText(query.toLowerCase())

	if (dataset.length === 0) return [ dataset, filter ]

	type TDataKey = keyof TData
	const keys: Array<TDataKey> = <Array<TDataKey>>Object.keys(dataset[0]).filter(key => fields.some(field => field === key))

	const newDataset: TData[] = dataset.filter((td: TData) => {
		return keys.some(key => {
			const value = td[key]

			if (typeof value === 'string') return value.toLowerCase().includes(filterText)

			return false
		})
	})

	return [ newDataset, filter ]
}


export default useFilter
