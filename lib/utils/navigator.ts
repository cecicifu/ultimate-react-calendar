export const FALLBACK_LOCALE = "en-US"

export const getNavigatorLocale = () => {
	try {
		if (typeof navigator === "undefined") return
		if (navigator.language) return navigator.language
		if (navigator.languages.length > 0) return navigator.languages[0]
	} catch {
		return FALLBACK_LOCALE
	}
}
