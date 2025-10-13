import { z } from 'zod'

export const EditHoursSchema = z.object({
	id: z.number().nullable(),
	time_in: z.string(),
	time_out: z.string().nullable(),
	userId: z.string().nullable(),
	orgId: z.string().nullable(),
})

export const DeleteHoursSchema = z.object({
	id: z.number(),
})
