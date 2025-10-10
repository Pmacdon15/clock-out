'use server'
import { auth } from '@clerk/nextjs/server'
import { EditHoursSchema } from '../zod/edit-hours'
import { updatePunchClock } from '../DB/edit-hours'

export async function editHours(formData: FormData) {
	const { orgId } = await auth.protect()

	if (!orgId) {
		return
	}

	const validatedFields = EditHoursSchema.safeParse({
		id: Number(formData.get('id')),
		punch_in: formData.get('punch_in'),
		punch_out: formData.get('punch_out'),
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
