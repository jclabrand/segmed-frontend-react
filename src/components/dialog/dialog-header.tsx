
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


type DialogHeaderProps = {
	title:	string
}

function DialogHeader(props: DialogHeaderProps) {

	return (
		<div className='dialog-header'>
			<h4>{ props.title }</h4>
		</div>
	)
}

export default DialogHeader
