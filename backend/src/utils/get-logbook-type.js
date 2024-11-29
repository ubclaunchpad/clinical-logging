export default async function getLogbookType(logbookID, supabase) {
    try {
        const { data, error } = await supabase.from("logbooks").select().eq("id", logbookID);
        if (error) {
            throw new Error(error.message);
        }
        return data[0]['type'];
    } catch (error) {
        return { error: error.message };
    }
}