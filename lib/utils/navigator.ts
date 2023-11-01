export const getNavigatorLocale = () => {
	if (!navigator) return
	if (navigator.languages != undefined) return navigator.languages[0]
	return navigator.language
}
