'use server'
import { DateTime } from 'luxon'
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

	const timeIn = formData.get('time_in')?.toString()
	const timeOut = formData.get('time_out')?.toString()

	if (!timeIn || !timeOut) {
		return {
			error: 'Time in and time out are required',
		}
	}

	// Convert local time (with given timezone) to UTC ISO string
	let utcTimeIn: string
	let utcTimeOut: string

	try {
		utcTimeIn = DateTime.fromISO(timeIn, { zone: timeZone }).toUTC().toISO()
		utcTimeOut = DateTime.fromISO(timeOut, { zone: timeZone }).toUTC().toISO()
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
