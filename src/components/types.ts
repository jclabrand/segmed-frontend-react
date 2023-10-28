

export type TValidator<TData> = {
	validate:	(value: TData) => boolean
	message:	string
}
