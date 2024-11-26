export async function createLogbook(req) {
    try {
        const supabase = req.supabase;
        const { type } = req.body;
        const { data, error } = await supabase.from("logbooks").insert({ type: type }).select();
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getUserLogbooks(req) {
    try {
        const supabase = req.supabase;
        const token = req.header("Authorization")?.split(" ")[1];
        const userID = parseUserID(token);
        const { data, error } = await supabase.from("logbooks").select().eq("user_id", userID);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

function parseUserID(token) {
    const parts = token.split(".");
    const decodedPayload = JSON.parse(atob(parts[1]));
    const userID = decodedPayload["sub"];
    return userID;
}

export async function getLogbook(req) {
    try {
        const supabase = req.supabase;
        const { logbookID } = req.params;
        const { data, error } = await supabase.from("logbooks").select().eq("id", logbookID);
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createLog(req) {
    try {
        const supabase = req.supabase;
        const { logbookID } = req.params;
        const { type } = req.body;
        const logbookType = await getLogbookType(logbookID, supabase);
        if (type !== logbookType) {
            throw new Error("Error: Log does not match logbook type");
        }
        let data;
        switch (type) {
            case "adult_cardiac_logs":
                data = createAdultCardiacLog(req, supabase);
                break;
            default:
                break;
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function createAdultCardiacLog(req, supabase) {
    const { logbookID } = req.params;
    const { caseNo } = req.body;
    const { data, error } = await supabase
        .from("adult_cardiac_logs")
        .insert({
            logbook_id: logbookID,
            case_no: Number(caseNo),
        })
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data[0];
}

async function getLogbookType(logbookID, supabase) {
    const { data, error } = await supabase.from("logbooks").select().eq("id", logbookID);
    if (error) {
        throw new Error(error.message);
    }
    return data[0]["type"];
}

export async function getLogbookLogs(req) {
    try {
        const supabase = req.supabase;
        const { logbookID } = req.params;
        const logbookType = await getLogbookType(logbookID, supabase);
        const { data, error } = await supabase.from(logbookType).select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getLog(req) {
    try {
        const supabase = req.supabase;
        const { logbookID, logID } = req.params;
        const logbookType = await getLogbookType(logbookID, supabase);
        const { data, error } = await supabase.from(logbookType).select().eq("id", logID);
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    } catch (error) {
        throw new Error(error.message);
    }
}