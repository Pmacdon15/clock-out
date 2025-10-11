'use server'
import { auth } from '@clerk/nextjs/server'
import { updatePunchClock } from '../DB/edit-hours'
import { EditHoursSchema } from '../zod/edit-hours'

export async function editHours(
	formData: FormData,
	punchClockId: number,
	timeZone: string,
) {
	const { orgId } = await auth.protect()

	if (!orgId) {
		return
	}

	// Get time_in and time_out from formData
	const timeIn = formData.get('time_in')
	const timeOut = formData.get('time_out')

	// Convert time to UTC
	const utcTimeIn = new Date(`${timeIn} ${timeZone}`).toISOString()
	const utcTimeOut = new Date(`${timeOut} ${timeZone}`).toISOString()

	const validatedFields = EditHoursSchema.safeParse({
		id: punchClockId,
		time_in: utcTimeIn,
		time_out: utcTimeOut,		
	})

	console.log('time_in', validatedFields.data?.time_in)
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
