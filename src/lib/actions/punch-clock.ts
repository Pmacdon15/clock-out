"use server";
import { auth } from "@clerk/nextjs/server";
import { getHoursWorkedDb, punchInOrOutDB } from "../DB/punch-clock-db";
import { revalidatePath } from "next/cache";

export async function punchInOrOutAction(punchOut: boolean) {
	const { userId, orgId } = await auth.protect();
	try {
		await punchInOrOutDB(punchOut, userId, orgId || userId);
		revalidatePath("/hours-worked");
	} catch (e) {
		console.error("Error:", e);
		return e;
	}
}

export async function getWeeklyHours(week: string) {
	const { userId, orgId } = await auth.protect();
	try {
		const hours = await getHoursWorkedDb(userId, orgId || userId, week);
		return hours;
	} catch (e) {
		console.error("Error:", e);
		return [];
	}
}
