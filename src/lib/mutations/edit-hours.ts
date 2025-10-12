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
			timeZone,
		}: {
			formData: FormData
			punchClockId: number
			timeZone: string
		}) => {
			return editHours(formData, punchClockId, timeZone)
		},
		onSuccess: () => {
			revalidatePathAction('/admin/manage-hours')
			onSuccess?.()
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}

export const useDeleteHours = () => {
	return useMutation({
		mutationFn: ({
			formData,
			punchClockId,
			timeZone,
		}: {
			formData: FormData
			punchClockId: number
			timeZone: string
		}) => {
			return editHours(formData, punchClockId, timeZone)
		},
		onSuccess: () => {
			revalidatePathAction('/admin/manage-hours')
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}
