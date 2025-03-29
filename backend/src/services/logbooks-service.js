import getLogbookType from "../utils/get-logbook-type.js";
import getTable from "../utils/get-table.js";
import insertTable from "../utils/insert-table.js";
import parseUserID from "../utils/parse-user-id.js";

export async function createLogbook(req) {
    const supabase = req.supabase;
    const body = req.body;
    const logbook = await insertTable(supabase, "logbooks", body);
    return logbook;
}

export async function getUserLogbooks(req) {
    try {
        const supabase = req.supabase;
        const token = req.header("Authorization")?.split(" ")[1];
        const userID = parseUserID(token);
        if (userID.error) {
            throw new Error(userID.error)
        }
        const userLogbooks = await getTable(supabase, "logbooks", "user_id", userID, "collection");
        return userLogbooks;
    } catch (error) {
        return { error: error.message };
    }
}

export async function getLogbook(req) {
    try {
        const supabase = req.supabase;
        const { logbookID } = req.params;
        const logbook = await getTable(supabase, "logbooks", "id", logbookID, "resource");
        if (typeof logbook == "undefined") {
            throw new Error(`Logbook ${logbookID} does not exist`);
        }
        return logbook;
    } catch (error) {
        return { error: error.message };
    }
}

export async function createLog(req) {
    try {
        const supabase = req.supabase;
        const { logbookID } = req.params;
        let body = req.body;
        body["logbook_id"] = logbookID;
        const logbookType = await getLogbookType(logbookID, supabase);
        if (logbookType.error) {
            throw new Error(logbookType.error);
        }
        if (body["type"] !== logbookType) {
            throw new Error(`Log type '${body["type"]}' does not match logbook type '${logbookType}'`);
        }
        switch (body["type"]) {
            case "adult_cardiac_logs":
                return await insertTable(supabase, "adult_cardiac_logs", body);
            case "congenital_surgery_logs":
                return await insertTable(supabase, "congenital_surgery_logs", body);
            case "general_surgery_logs":
                return await insertTable(supabase, "general_surgery_logs", body);
            case "gyn_logs":
                return await insertTable(supabase, "gyn_logs", body)
            case "ob_logs":
                return await insertTable(supabase, "ob_logs", body)
            default:
                throw new Error(`Log and logbook type '${body["type"]}' are invalid`);
        }
    } catch (error) {
        return { error: error.message };
    }
}

export async function getLogbookLogs(req) {
    try {
        const supabase = req.supabase;
        const { logbookID } = req.params;
        const logbookType = await getLogbookType(logbookID, supabase);
        if (logbookType.error) {
            throw new Error(logbookType.error);
        }
        const logbookLogs = await getTable(supabase, logbookType, "logbook_id", logbookID, "collection");
        return logbookLogs;
    } catch (error) {
        return { error: error.message };
    }
}

export async function getLog(req) {
    try {
        const supabase = req.supabase;
        const { logbookID, logID } = req.params;
        const logbookType = await getLogbookType(logbookID, supabase);
        if (logbookType.error) {
            throw new Error(logbookType.error);
        }
        const log = await getTable(supabase, logbookType, "id", logID, "resource");
        if (typeof log == "undefined") {
            throw new Error(`Log ${logID} does not exist`);
        }
        return log;
    } catch (error) {
        return { error: error.message };
    }
}

export async function deleteLog(req) {
    try {
        const supabase = req.supabase;
        const { logbookID, logID } = req.params;

        const logbookType = await getLogbookType(logbookID, supabase);
        if (logbookType.error) {
            throw new Error(logbookType.error);
        }

        const log = await getTable(supabase, logbookType, "id", logID, "resource");
        if (!log) {
            throw new Error(`Log ${logID} does not exist in logbook ${logbookID}`);
        }

        const { error } = await supabase
            .from(logbookType)
            .delete()
            .eq("id", logID);
        if (error) {
            throw new Error(`Failed to delete log: ${error.message}`);
        }

        return { success: true, message: `Log ${logID} deleted successfully from ${logbookType}` };
    } catch (error) {
        return { error: error.message };
    }
}
