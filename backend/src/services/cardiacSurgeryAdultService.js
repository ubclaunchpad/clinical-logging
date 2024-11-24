
async function insertTable(req, res) {
    try{
        const supabase = req.supabase;

        const {
            case_no, 
            surgeon,
            type,
            or_date,
            patient_id,
            age,
            gender,
            hpi,
            etoh,
            drugs,
            smoking,
            pmhx,
            meds,
            allergies,
            weight,
            height,
            bmi,
            veins,
            allen_test,
            pulses,
            cath,
            echo,
            ef,
            rvfx,
            wma,
            aorta,
            valves,
            ct,
            hb,
            w,
            plt,
            cr,
            cxr,
            surgical_plan,
            my_role,
            one_deg_operator,
            or,
            post,
            flag_fu,
            cpb_h,
            cpb_m,
            xc_h,
            xc_m,
            ca_h,
            ca_m,
            post_operative_course,
            learning_points,
            } = req.body;

        const error = await supabase.schema("user_info").from("cardiac_surgery_adult_log")
            .insert({ 
                case_no: case_no, 
                surgeon: surgeon,
                type: type,
                or_date: or_date,
                patient_id: patient_id,
                age: age,
                gender: gender,
                hpi: hpi,
                etoh: etoh,
                drugs: drugs,
                smoking: smoking,
                pmhx: pmhx,
                meds: meds,
                allergies: allergies,
                weight: weight,
                height: height,
                bmi: bmi,
                veins: veins,
                allen_test: allen_test,
                pulses: pulses,
                cath: cath,
                echo: echo,
                ef: ef,
                rvfx: rvfx,
                wma: wma,
                aorta: aorta,
                valves: valves,
                ct: ct,
                hb: hb,
                w: w,
                plt: plt,
                cr: cr,
                cxr: cxr,
                surgical_plan: surgical_plan,
                my_role: my_role,
                one_deg_operator: one_deg_operator,
                or: or,
                post: post,
                flag_fu: flag_fu,
                cpb_h: cpb_h,
                cpb_m: cpb_m,
                xc_h: xc_h,
                xc_m: xc_m,
                ca_h: ca_h,
                ca_m: ca_m,
                post_operative_course: post_operative_course,
                learning_points: learning_points, });
            
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

