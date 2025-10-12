'use server'
import { auth } from '@clerk/nextjs/server'
import { updatePunchClock } from '@/lib/DB/edit-hours'
import { EditHoursSchema } from '@/lib/zod/edit-hours'

export async function editHours(formData: FormData, punchClockId: number) {
	const { orgId } = await auth.protect()

	if (!orgId) {
		return
	}

	// Get time_in and time_out from formData
	const timeIn = formData.get('time_in')?.toString()
	const timeOut = formData.get('time_out')?.toString()

	if (!timeIn) {
		return {
			error: 'Time in is required',
		}
	}

	// Convert time to UTC
	let utcTimeIn: string
	let utcTimeOut: string | null = null

	try {
		utcTimeIn = new Date(timeIn).toISOString()
		if (timeOut) {
			utcTimeOut = new Date(timeOut).toISOString()
		}
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
