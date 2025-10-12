'use server'
import { auth } from '@clerk/nextjs/server'
import { updatePunchClock } from '@/lib/DB/edit-hours'
import { EditHoursSchema } from '@/lib/zod/edit-hours'

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
	const timeIn = formData.get('time_in')?.toString()
	const timeOut = formData.get('time_out')?.toString()

	if (!timeIn || !timeOut) {
		return {
			error: 'Time in and time out are required',
		}
	}

	// Convert time to UTC
	let utcTimeIn: string
	let utcTimeOut: string

	try {
		utcTimeIn = new Date(`${timeIn} ${timeZone}`).toISOString()
		utcTimeOut = new Date(`${timeOut} ${timeZone}`).toISOString()
	} catch (error) {
		console.error('Error converting time to UTC:', error)
		return {
			error: 'Invalid date or time format',
		}
	}

	const validatedFields = EditHoursSchema.safeParse({
		id: punchClockId,
		time_in: utcTimeIn,
		time_out: utcTimeOut,
		timeZone: timeZone,
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
