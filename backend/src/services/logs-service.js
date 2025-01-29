import getTable from "../utils/get-table.js";
import { getUserLogbooks } from "./logbooks-service.js";

export async function getUserLogs(req) {
    try {
        const supabase = req.supabase;
        const userLogbooks = await getUserLogbooks(req);
        if (userLogbooks.error) {
            throw new Error(userLogbooks.error)
        }
        const logs = [];
        for (const logbook of userLogbooks) {
            const logbookLogs = await getTable(supabase, logbook.type, "logbook_id", logbook.id, "collection");
            logs.push(...logbookLogs)
        }
        return logs;
    } catch (error) {
        return { error: error.message };
    }
}
