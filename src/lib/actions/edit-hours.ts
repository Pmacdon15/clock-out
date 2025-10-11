'use server'
import { auth } from '@clerk/nextjs/server'
import { updatePunchClock } from '../DB/edit-hours'
import { EditHoursSchema } from '../zod/edit-hours'

export async function editHours(formData: FormData, punchClockId: number) {
	const { orgId } = await auth.protect()

	if (!orgId) {
		return
	}

	const validatedFields = EditHoursSchema.safeParse({
		id: punchClockId,
		time_in: formData.get('time_in'),
		time_out: formData.get('time_out'),
	})

	console.log("time_in", validatedFields.data?.time_in)
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
