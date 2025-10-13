import { z } from 'zod'

export const EditHoursSchema = z.object({
	id: z.number().optional(),
	time_in: z.string(),
	time_out: z.string().nullable(),
})

export const DeleteHoursSchema = z.object({
	id: z.number(),
})
