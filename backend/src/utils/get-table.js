export default async function getTable(supabase, table, param, value, type) {
    try {
        let data, error;
        if (param == null && value == null) {
            ({ data, error } = await supabase.from(table).select());
        } else if (param !== null && value !== null) {
            ({ data, error } = await supabase.from(table).select().eq(param, value));
        } else {
            throw new Error(`${param == null ? "param" : "value"} is empty at getTable`);
        }
        if (error) {
            throw new Error(error.message);
        }
        return type === "collection" ? data : data[0];
    } catch (error) {
        return { error: error.message };
    }
}