import { z } from 'zod'

export const EditHoursSchema = z.object({
	id: z.number(),
	punch_in: z.string(),
	punch_out: z.string().nullable(),
})
