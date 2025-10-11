'use server'
import { auth } from '@clerk/nextjs/server'
import { updatePunchClock } from '../DB/edit-hours'
import { EditHoursSchema } from '../zod/edit-hours'

export async function editHours(formData: FormData, punchClockId: number) {
	const { orgId } = await auth.protect()

	if (!orgId) {
		return
	}

	const timeInString = formData.get('time_in') as string
	const timeOutString = formData.get('time_out') as string | null
	const timezoneOffset = parseInt(formData.get('timezone_offset') as string, 10)

	// Parse the datetime-local strings as local time
	const timeInLocal = new Date(timeInString)
	const timeOutLocal = timeOutString ? new Date(timeOutString) : null

	// Adjust for the client's timezone offset to get UTC
	// getTimezoneOffset returns the difference in minutes between UTC and local time.
	// So, to convert local time to UTC, we add the offset.
	timeInLocal.setMinutes(timeInLocal.getMinutes() + timezoneOffset)
	if (timeOutLocal) {
		timeOutLocal.setMinutes(timeOutLocal.getMinutes() + timezoneOffset)
	}

	const validatedFields = EditHoursSchema.safeParse({
		id: punchClockId,
		time_in: timeInLocal.toISOString(), // Send as ISO string (UTC)
		time_out: timeOutLocal ? timeOutLocal.toISOString() : null, // Send as ISO string (UTC)
	})

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors,
		}
	}

	try {
		await updatePunchClock(validatedFields.data)
	} catch (error) {
		console.error(error)
		return {
			error: 'Something went wrong',
		}
	}
}
