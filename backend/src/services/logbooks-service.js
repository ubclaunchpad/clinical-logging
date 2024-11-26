export async function createLogbook(req) {
    try {
        const supabase = req.supabase;
        const { type } = req.body;
        const { data, error } = await supabase.from("logbooks").insert({ type: type }).select();
        if (error) {
            console.error("Error in createLogbook:", error.message);
            throw new Error(error.message);
        } else {
            return data[0];
        }
    } catch (error) {
        console.error("Error in createLogbook:", error.message);
        throw new Error(error.message);
    }
}

export async function getUserLogbooks(req) {
    try {
        const supabase = req.supabase;
        const token = req.header("Authorization")?.split(" ")[1];
        const userID = parseUserID(token)
        const { data, error } = await supabase.from("logbooks").select().eq("user_id", userID);
        if (error) {
            console.error("Error in getUserLogbooks:", error.message);
            throw new Error(error.message);
        } else {
            return data;
        }
    } catch (error) {
        console.error("Error in getUserLogbooks:", error.message);
        throw new Error(error.message);
    }
}

function parseUserID(token) {
    const parts = token.split('.');
    const decodedPayload = JSON.parse(atob(parts[1]));
    const userID = decodedPayload["sub"]
    return userID
}

export async function getLogbook(req) {
    try {
        const supabase = req.supabase;
        const { id } = req.params;
        const { data, error } = await supabase.from("logbooks").select().eq("logbook_id", id);
        if (error) {
            console.error("Error in getLogbook:", error.message);
            throw new Error(error.message);
        } else {
            return data[0];
        }
    } catch (error) {
        console.error("Error in getLogbook:", error.message);
        throw new Error(error.message);
    }
}