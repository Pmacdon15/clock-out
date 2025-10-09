import { auth } from "@clerk/nextjs/server";
import { HoursWorked, MonthlyHours, TimeCard, Week } from "../types/punch-clock-types";
import { getAllWeeksWithWorkDb, getHoursWorkedByYearDb, getHoursWorkedDb, getTimeCardDb } from "../DB/punch-clock-db";

export async function getTimeCard(): Promise<TimeCard | null> {
    const { userId, orgId } = await auth.protect()
    try {
        const timeCards = await getTimeCardDb(userId, orgId || userId)
        if (timeCards.length > 0) {
            return timeCards[0];
        }
        return null;
    } catch (e) {
        console.error("Error: ", e)
        return null;
    }

}

export async function getHoursWorked(week?: string): Promise<HoursWorked[]> {
    const { userId, orgId } = await auth.protect()
    try {
        const hoursWorked = await getHoursWorkedDb(userId, orgId || userId, week)
        return hoursWorked;
    } catch (e) {
        console.error("Error: ", e)
        return [];
    }
}

export async function getAllWeeksWithWork(): Promise<Week[]> {
    const { userId, orgId } = await auth.protect()
    try {
        const weeks = await getAllWeeksWithWorkDb(userId, orgId || userId)
        return weeks;
    } catch (e) {
        console.error("Error: ", e)
        return [];
    }
}

export async function getAllWeeksWithWorkForEmployee(employeeId?: string): Promise<Week[]> {
    const { userId, orgId } = await auth.protect()
    if (!employeeId) return []
    try {
        const weeks = await getAllWeeksWithWorkDb(employeeId, orgId || userId)
        return weeks;
    } catch (e) {
        console.error("Error: ", e)
        return [];
    }
}


export async function getHoursWorkedByYear(year: number): Promise<MonthlyHours[]> {
    const { userId, orgId } = await auth.protect()
    try {
        const hoursWorked = await getHoursWorkedByYearDb(userId, orgId || userId, year)
        return hoursWorked;
    } catch (e) {
        console.error("Error: ", e)
        return [];
    }
}