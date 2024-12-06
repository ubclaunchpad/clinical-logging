export default async function insertTable(supabase, table, values) {
    try {
        const { data, error } = await supabase.from(table).insert(values).select();
        if (error) {
            throw new Error(error.message);
        } else {
            return data[0];
        }
    } catch (error) {
        return { error: error.message }; 
    }
}