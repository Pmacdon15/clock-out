import { auth } from "@clerk/nextjs/server";
import { TimeCard, getTimeCardDb } from "../DB/punch-clock-db";

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