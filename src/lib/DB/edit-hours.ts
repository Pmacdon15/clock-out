import { neon } from '@neondatabase/serverless'
import type { z } from 'zod'
import type { TimeCard } from '../types/punch-clock-types'
import type { DeleteHoursSchema, EditHoursSchema } from '../zod/edit-hours'

export async function updatePunchClock(
	punchClock: z.infer<typeof EditHoursSchema>,
): Promise<TimeCard[]> {
	const sql = neon(process.env.DATABASE_URL || '')

	const result = await sql`
        UPDATE time_clock
        SET time_in = ${punchClock.time_in}, time_out = ${punchClock.time_out}
        WHERE id = ${punchClock.id}
        RETURNING *;
    `
	return result as TimeCard[]
}

export async function addPunchClock(
	punchClock: Omit<z.infer<typeof EditHoursSchema>, 'id'>,
	userId: string,
	orgId: string,
): Promise<TimeCard[]> {
	const sql = neon(process.env.DATABASE_URL || '')

	const result = await sql`
    INSERT INTO time_clock (user_id, org_id, time_in, time_out)
    VALUES (${userId}, ${orgId}, ${punchClock.time_in}, ${punchClock.time_out})
    RETURNING *;
`
	return result as TimeCard[]
}

export async function deletePunchClock(
	punchClock: z.infer<typeof DeleteHoursSchema>,
): Promise<TimeCard[]> {
	const sql = neon(process.env.DATABASE_URL || '')

	const result = await sql`
    DELETE FROM time_clock 
    WHERE id = ${punchClock.id}
    RETURNING *;
  `
	return result as TimeCard[]
}
