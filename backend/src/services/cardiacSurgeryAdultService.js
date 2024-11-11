
async function insertTable(req, res) {
    try{
        const supabase = req.supabase;
        //get id
        const { data: { user } } = await supabase.auth.getUser()
        const id = user.id;

        const {
            case_no, 
            patient_id, 
            type, 
            surgeon, 
            or_date, 
            age, 
            sex, 
            reason, 
            hpi, 
            social } = req.body;

        const error = await supabase.schema("user_info").from("cardiac_surgery_adult_log")
            .upsert({
                id: id, 
                case_no: case_no, 
                patient_id: patient_id,
                type: type, 
                surgeon: surgeon, 
                or_date: or_date, 
                age: age, 
                sex: sex, 
                reason: reason, 
                hpi: hpi, 
                social: social })
            .select();
            
        if (error.error) {
                console.log(error);
                console.error("Insert Error:", error.error.message);
                throw new Error("Failed to insert data: " + error.error.message);
        }

        res.message = "Log Successful"

        return {message: "Log Successful"};
    } catch (error) {
        console.error("Error in insertTable:", error.message);
        throw new Error(error.message); // Propagate the error 
    }
}

export default insertTable;

