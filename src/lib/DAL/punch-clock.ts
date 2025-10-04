import { auth } from "@clerk/nextjs/server";
import { TimeCard, getTimeCardDb, getHoursWorkedDb, HoursWorked } from "../DB/punch-clock-db";

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

export async function getHoursWorked(): Promise<HoursWorked[]> {
    const { userId, orgId } = await auth.protect()
    try {
        const hoursWorked = await getHoursWorkedDb(userId, orgId || userId)
        return hoursWorked;
    } catch (e) {
        console.error("Error: ", e)
        return [];
    }
}