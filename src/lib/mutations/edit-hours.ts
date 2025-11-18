import { useMutation } from '@tanstack/react-query'
import { deleteHours, editHours } from '../actions/edit-hours'
import { revalidatePathAction, updateTagAction } from '../actions/revalidate'

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
			updateTagAction('weeks-worked-for-employee')
			updateTagAction('employee-time-cards')
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
			updateTagAction('weeks-worked-for-employee')
			updateTagAction('employee-time-cards')
			revalidatePathAction('/hours-worked')
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}
