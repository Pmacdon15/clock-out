import { neon } from "@neondatabase/serverless";

export interface TimeCard {
    id: number;
    user_id: string;
    org_id: string;
    time_in: Date;
    time_out: Date | null;
}

export async function punchInOrOutDB(punchOut: boolean, userId: string, orgId: string): Promise<TimeCard[]> {
    const sql = neon(process.env.DATABASE_URL!);
    const currentTime = new Date();

    if (punchOut) {
        // Punching out: Update the existing open time card.
        const result = await sql`
            UPDATE time_clock
            SET time_out = ${currentTime}
            WHERE user_id = ${userId} AND org_id = ${orgId} AND time_out IS NULL
            RETURNING *;
        `;
        return result as TimeCard[];
    } else {
        // Punching in: Insert a new time card.
        const result = await sql`
            INSERT INTO time_clock (user_id, org_id, time_in)
            VALUES (${userId}, ${orgId}, ${currentTime})
            RETURNING *;
        `;
        return result as TimeCard[];
    }
}

export async function getTimeCardDb(userId: string, orgId: string): Promise<TimeCard[]> {
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`
        SELECT * FROM time_clock
        WHERE user_id = ${userId} AND org_id = ${orgId} AND time_out IS NULL
    `;

    return result as TimeCard[];
}