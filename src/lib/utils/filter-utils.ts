import { useRouter, useSearchParams } from 'next/navigation'

export function useHandleParamChange() {
	const router = useRouter()
	const searchParams = useSearchParams()

	return (paramName: string, paramValue: string, path: string) => {
		const params = new URLSearchParams(searchParams.toString())
		if (paramValue) {
			params.set(paramName, paramValue)
		} else {
			params.delete(paramName)
		}
		router.push(`${path}?${params.toString()}`)
	}
}

export function formatDateForInput(date: Date) {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hour = String(date.getHours()).padStart(2, '0')
	const minute = String(date.getMinutes()).padStart(2, '0')
	return `${year}-${month}-${day}T${hour}:${minute}`
}
