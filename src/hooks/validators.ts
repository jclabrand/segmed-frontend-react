
function useValidators() {
	const defaultMessage = 'Este campo es obligatorio'
	const isNotEmptyString = (value: string) => (typeof value == 'string') && (value.length > 0)

	return {
		notEmptyString: (msg: string | undefined = undefined) => ({
			validate: isNotEmptyString,
			message: msg || defaultMessage
		})
	}
}

export default useValidators
