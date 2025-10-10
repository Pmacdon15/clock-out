import { useMutation } from '@tanstack/react-query'
import { editHours } from '../actions/edit-hours'
import { revalidatePathAction } from '../actions/revalidate'

export const usePunchClock = () => {
	return useMutation({
		mutationFn: (formData: FormData) => {
			return editHours(formData)
		},
		onSuccess: () => {
			revalidatePathAction('/admin/edit-hours')
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}
