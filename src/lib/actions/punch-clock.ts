'use server'
import { auth } from "@clerk/nextjs/server"
import { punchInOrOutDB } from "../DB/punch-clock-db"

export async function punchInOrOutAction(punchOut = false) {
    const { userId, orgId } = await auth.protect()
    try {
        await punchInOrOutDB(punchOut, userId, orgId || userId)
    } catch (e) {
        console.error("Error:", e)
        return e
    }



}