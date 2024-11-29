import getLogbookType from "../utils/get-logbook-type.js";
import getTable from "../utils/get-table.js";
import insertTable from "../utils/insert-table.js";
import parseUserID from "../utils/parse-user-id.js";

export async function createLogbook(req) {
    const supabase = req.supabase;
    const body = req.body
    return insertTable(supabase, "logbooks", body);
}

export async function getUserLogbooks(req) {
    const supabase = req.supabase;
    const token = req.header("Authorization")?.split(" ")[1];
    const userID = parseUserID(token);
    return getTable(supabase, "logbooks", "user_id", userID, "collection");
}

export async function getLogbook(req) {
    const supabase = req.supabase;
    const { logbookID } = req.params;
    return getTable(supabase, "logbooks", "id", logbookID, "resource");
}

export async function createLog(req) {
    try {
        const supabase = req.supabase;
        const { logbookID } = req.params;
        let body = req.body
        body['logbook_id'] = logbookID
        const logbookType = await getLogbookType(logbookID, supabase);
        if (body['type'] !== logbookType) {
            throw new Error(`log type '${body['type']}' does not match logbook type '${logbookType}'`);
        }
        switch (body['type']) {
            case "adult_cardiac_logs":
                return insertTable(supabase, "adult_cardiac_logs", body) 
            default:
                throw new Error(`log and logbook type '${body['type']}' are invalid`);
        }
    } catch (error) {
        return { error: error.message };
    }
}

export async function getLogbookLogs(req) {
    const supabase = req.supabase;
    const { logbookID } = req.params;
    const logbookType = await getLogbookType(logbookID, supabase);
    return getTable(supabase, logbookType, "logbook_id", logbookID, "collection");
}

export async function getLog(req) {
    const supabase = req.supabase;
    const { logbookID, logID } = req.params;
    const logbookType = await getLogbookType(logbookID, supabase);
    return getTable(supabase, logbookType, "id", logID, "resource");
}