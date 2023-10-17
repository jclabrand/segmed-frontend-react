
import { useRef } from 'react'
import './toolbar-search.css'


type ToolBarSearchProps = {
	onSearch: (filterText: string) => void
}

function useToolBarSearch(props: ToolBarSearchProps) {

	const inputRef = useRef<HTMLInputElement>(null)

	const onSearch = () => {
		props.onSearch(inputRef.current?.value || '')
	}

	return {
		inputRef,
		onSearch
	}
}

function ToolBarSearch(props: ToolBarSearchProps) {
	const { inputRef, onSearch } = useToolBarSearch(props)

	return (
		<div className='toolbar-sesarch'>
			<input ref={inputRef} type="search" />
			<button onClick={ onSearch }>Buscar</button>
		</div>
	)
}

export default ToolBarSearch
