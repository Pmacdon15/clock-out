import { useMutation } from '@tanstack/react-query'
import { deleteHours, editHours } from '../actions/edit-hours'
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
			userId,
		}: {
			formData: FormData
			timeZone: string
			punchClockId?: number
			userId?: string
		}) => {
			return editHours(formData, timeZone, punchClockId, userId)
		},
		onSuccess: () => {
			revalidatePathAction('/admin/manage-hours')
			revalidatePathAction('/hours-worked')
			onSuccess?.()
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}

export const useDeleteHours = () => {
	return useMutation({
		mutationFn: (hoursId: number) => {
			return deleteHours(hoursId)
		},
		onSuccess: () => {
			revalidatePathAction('/admin/manage-hours')
			revalidatePathAction('/hours-worked')
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}
