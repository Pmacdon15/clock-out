'use server'
import { auth } from '@clerk/nextjs/server'
import moment from 'moment-timezone'
import { deletePunchClock, updatePunchClock } from '@/lib/DB/edit-hours'
import { DeleteHoursSchema, EditHoursSchema } from '@/lib/zod/edit-hours'
import { isAdminFunction } from '../utils/clerk-utils'

export async function editHours(
	formData: FormData,
	punchClockId: number,
	timeZone: string,
) {
	const { isAdmin, orgId } = await isAdminFunction()

	if (!orgId || !isAdmin) {
		throw new Error("Not Authorized  ")
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
		utcTimeIn = moment.tz(`${timeIn}:00`, timeZone).utc().toISOString()
		if (timeOut) {
			utcTimeOut = moment
				.tz(`${timeOut}:00`, timeZone)
				.utc()
				.toISOString()
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

export async function deleteHours(hoursId: number) {
	const { isAdmin, orgId } = await isAdminFunction()

	if (!orgId || !isAdmin) {
		throw new Error("Not Authorized  ")
	}

	const validatedFields = DeleteHoursSchema.safeParse({
		id: hoursId,
	})

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors,
		}
	}

	try {
		await deletePunchClock(validatedFields.data)
	} catch (error) {
		console.error(error)
		return {
			error: 'Something went wrong',
		}
	}
}
