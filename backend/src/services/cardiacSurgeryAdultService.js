
async function insertTable(req, res) {
    try{
        const supabase = req.supabase;

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
            social,
            pmhx,
            meds,
            allergies,
            exam,
            veins,
            allen_test,
            pulses,
            invx,
            cxr,
            ct,
            cath,
            surgical_plan,
            operative_notes,
            post_op_course,
            learning_points
            } = req.body;

        const error = await supabase.schema("user_info").from("cardiac_surgery_adult_log")
            .insert({ 
                case_no: case_no, 
                patient_id: patient_id,
                type: type, 
                surgeon: surgeon, 
                or_date: or_date, 
                age: age, 
                sex: sex, 
                reason: reason, 
                hpi: hpi, 
                social: social,
                pmhx: pmhx,
                meds: meds,
                allergies: allergies,
                exam: exam,
                veins: veins,
                allen_test: allen_test,
                pulses: pulses,
                invx: invx,
                cxr: cxr,
                ct: ct,
                cath: cath,
                surgical_plan: surgical_plan,
                operative_notes: operative_notes,
                post_op_course: post_op_course,
                learning_points: learning_points });
            
        if (error.error) {
                console.log(error);
                console.error("Insert Error:", error.error.message);
                throw new Error("Failed to insert data: " + error.error.message);
        }

        return {message: "Log Successful"};
    } catch (error) {
        console.error("Error in insertTable:", error.message);
        throw new Error(error.message);
    }
}

export default insertTable;

