import { auth } from '@clerk/nextjs/server'
import { cacheTag } from 'next/cache'
import {
	getAllWeeksWithWorkDb,
	getHoursWorkedByYearDb,
	getHoursWorkedDb,
	getTimeCardDb,
	getTimeCardsDb,
} from '../DB/punch-clock-db'
import type {
	HoursWorked,
	MonthlyHours,
	TimeCard,
	Week,
} from '../types/punch-clock-types'

export async function getTimeCard(): Promise<TimeCard | null> {
	const { userId, orgId } = await auth.protect()
	try {
		const timeCards = await getTimeCardDb(userId, orgId || userId)
		if (timeCards.length > 0) {
			return timeCards[0]
		}
		return null
	} catch (e) {
		console.error('Error: ', e)
		return null
	}
}
export async function getEmployeeTimeCards(
	week?: string,
	employeeId?: string,
): Promise<TimeCard[] | null> {
	const { userId, orgId } = await auth.protect()
	let idToUse: string
	if (employeeId) idToUse = employeeId
	else idToUse = userId

	try {
		const timeCards = await getTimeCardsDb(idToUse, orgId || userId, week)
		return timeCards
	} catch (e) {
		console.error('Error: ', e)
		return null
	}
}

export async function getHoursWorked(week?: string): Promise<HoursWorked[]> {
	'use cache:private'
	const { userId, orgId } = await auth.protect()
	try {
		const hoursWorked = await getHoursWorkedDb(
			userId,
			orgId || userId,
			week,
		)
		console.log('server Hours Worked: ', hoursWorked)
		return hoursWorked
	} catch (e) {
		console.error('Error: ', e)
		return []
	}
}

export async function getAllWeeksWithWork(): Promise<Week[]> {
	'use cache :private'
	cacheTag('allWeeksWorked')
	const { userId, orgId } = await auth.protect()
	try {
		const weeks = await getAllWeeksWithWorkDb(userId, orgId || userId)
		return weeks
	} catch (e) {
		console.error('Error: ', e)
		return []
	}
}

export async function getAllWeeksWithWorkForEmployee(
	employeeId?: string,
): Promise<Week[]> {
	const { userId, orgId } = await auth.protect()
	let idToSubmit: string
	if (!employeeId) idToSubmit = userId
	else idToSubmit = employeeId

	try {
		const weeks = await getAllWeeksWithWorkDb(idToSubmit, orgId || userId)
		return weeks
	} catch (e) {
		console.error('Error: ', e)
		return []
	}
}

export async function getHoursWorkedByYear(
	year?: number,
): Promise<MonthlyHours[]> {
	const { userId, orgId } = await auth.protect()
	try {
		const hoursWorked = await getHoursWorkedByYearDb(
			userId,
			orgId || userId,
			year,
		)
		return hoursWorked
	} catch (e) {
		console.error('Error: ', e)
		return []
	}
}
