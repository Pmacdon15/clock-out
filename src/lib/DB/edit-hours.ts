import { PunchClock } from '../types/punch-clock-types'
import { db } from './punch-clock-db'

export async function updatePunchClock(punchClock: PunchClock) {
	return await db
		.updateTable('punch_clock')
		.set({
			punch_in: punchClock.punch_in,
			punch_out: punchClock.punch_out,
		})
		.where('id', '=', punchClock.id)
		.execute()
}
