'use server'
import moment from 'moment-timezone'
import {
	addPunchClock,
	deletePunchClock,
	updatePunchClock,
} from '@/lib/DB/edit-hours'
import { DeleteHoursSchema, EditHoursSchema } from '@/lib/zod/edit-hours'
import { isAdminFunction } from '../utils/clerk-utils'

export async function editHours(
	formData: FormData,
	timeZone: string,
	punchClockId?: number,
	userId?: string,
) {
	const { isAdmin, orgId } = await isAdminFunction()

	if (!orgId || !isAdmin) {
		throw new Error('Not Authorized  ')
	}

	// Get time_in and time_out from formData
	const timeIn = formData.get('time_in')?.toString()
	let timeOut = formData.get('time_out')?.toString()

	if (
		timeIn === undefined ||
		timeIn === null ||
		timeIn === '' ||
		timeIn.endsWith('T')
	) {
		return {
			error: 'Time in is required',
		}
	}

	if (
		timeOut === undefined ||
		timeOut === null ||
		timeOut === '' ||
		timeOut.endsWith('T')
	) {
		timeOut = undefined
	}

	// Convert time to UTC
	let utcTimeIn: string
	let utcTimeOut: string | null = null

	try {
		utcTimeIn = moment.tz(timeIn, timeZone).utc().toISOString()
		if (timeOut) {
			utcTimeOut = moment.tz(timeOut, timeZone).utc().toISOString()
		}
	} catch (error) {
		console.error('Error converting time to UTC:', error)
		return {
			error: 'Invalid date or time format',
		}
	}
	//MARK: TODO: add userId And org Id to field
	const validatedFields = EditHoursSchema.safeParse({
		id: punchClockId,
		time_in: utcTimeIn,
		time_out: utcTimeOut,
		user_id: userId,
		org_id: orgId,
	})

	console.log('time_in', validatedFields.data?.time_in)
	if (!validatedFields.success) {
		console.error(validatedFields.error.flatten())
		throw new Error('Validation Error')
	}

	try {
		if (punchClockId) await updatePunchClock(validatedFields.data)
		else await addPunchClock(validatedFields.data)
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
		throw new Error('Not Authorized  ')
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
