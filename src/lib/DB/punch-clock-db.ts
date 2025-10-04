import { neon } from "@neondatabase/serverless";

export async function punchInOrOutDB(punchOut: boolean, userId: string, orgId: string) {
    const sql = neon(process.env.DATABASE_URL!);
    const currentTime = new Date();
    const result = await sql`
        INSERT INTO time_clock (user_id, org_id, ${sql.unsafe(punchOut ? 'time_out' : 'time_in')})
        VALUES (${userId}, ${orgId}, ${currentTime})
        RETURNING *;
    `;
    // console.log("addClientDB result:", result);
    return result;

}