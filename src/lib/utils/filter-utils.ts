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
