import { useMutation } from '@tanstack/react-query'
import { editHours } from '../actions/edit-hours'
import { revalidatePathAction } from '../actions/revalidate'

export const useEditHours = ({
	onSuccess,
}: {
	onSuccess?: () => void
} = {}) => {
	return useMutation({
		mutationFn: ({
			formData,
			punchClockId,
		}: {
			formData: FormData
			punchClockId: number
		}) => {
			return editHours(formData, punchClockId)
		},
		onSuccess: () => {
			revalidatePathAction('/admin/edit-hours')
			onSuccess?.()
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}
