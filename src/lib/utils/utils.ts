import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getWeekNumber(
	d: Date | undefined,
): [number, number] | undefined {
	if (!d) return undefined

	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
	var weekNo = Math.ceil(
		((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7,
	)
	return [d.getUTCFullYear(), weekNo]
}
