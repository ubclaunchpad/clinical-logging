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
    const {
        type,
        caseNo,
        paitentID,
        surgeon,
        age,
        gender,
        orDate,
        reason,
        hpi,
        socialEtOH,
        socialDrugs,
        socialSmoking,
        socialMeds,
        socialAllergies,
        phmxHTN,
        phmxDMII,
        phmxDLP,
        phmxCVA,
        examWeight,
        examHeight,
        examBMI,
        examVeins,
        examAllenTest,
        examPulsesSixtyTwo,
        examPulsesSixtyFive,
        examPulsesSixtyEight,
        examPulsesSeventy,
        cathLink,
        invxEchoEF,
        invxEchoRVFx,
        invxWMA,
        invxAorta,
        invxValves,
        invxCXR,
        invxHb,
        invxW,
        invxPit,
        invxCr,
        ctLink,
        surgicalPlan,
        surgicalPlanFirstOperator,
        surgicalPlanIssueOR,
        surgicalPlanIssuePost,
        surgicalPlanaFlagForFU,
        operativeNotesCPBh,
        operativeNotesCPBm,
        operativeNotesXCh,
        operativeNotesXCm,
        operativeNotesCAh,
        operativeNotesCAm,
        myRole,
        postOperativeCourse,
        learningPointsKeyLessons,
    } = req.body;
    const { data, error } = await supabase
        .from("adult_cardiac_logs")
        .insert({
            logbook_id: logbookID,
            type: type,
            case_no: caseNo,
            paitent_id: paitentID,
            surgeon: surgeon,
            age: age,
            gender: gender,
            or_date: orDate,
            reason: reason,
            hpi: hpi,
            social_etoh: socialEtOH,
            social_drugs: socialDrugs,
            social_smoking: socialSmoking,
            social_meds: socialMeds,
            social_allergies: socialAllergies,
            pmhx_htn: phmxHTN,
            pmhx_dmii: phmxDMII,
            pmhx_dlp: phmxDLP,
            pmhx_cva: phmxCVA,
            exam_weight: examWeight,
            exam_height: examHeight,
            exam_bmi: examBMI,
            exam_veins: examVeins,
            exam_allen_test: examAllenTest,
            exam_pulses_sixtytwo: examPulsesSixtyTwo,
            exam_pulses_sixtyfive: examPulsesSixtyFive,
            exam_pulses_sixtyeight: examPulsesSixtyEight,
            exam_pulses_seventy: examPulsesSeventy,
            cath: cathLink,
            invx_echo_ef: invxEchoEF,
            invx_echo_rvfx: invxEchoRVFx,
            invx_wma: invxWMA,
            invx_aorta: invxAorta,
            invx_valves: invxValves,
            invx_cxr: invxCXR,
            invx_hb: invxHb,
            invx_w: invxW,
            invx_pit: invxPit,
            invx_cr: invxCr,
            ct: ctLink,
            surgical_plan: surgicalPlan,
            surgical_plan_first_operator: surgicalPlanFirstOperator,
            surgical_plan_issue_or: surgicalPlanIssueOR,
            surgical_plan_issue_post: surgicalPlanIssuePost,
            surgical_plan_flag_for_fu: surgicalPlanaFlagForFU,
            operative_notes_cpb_h: operativeNotesCPBh,
            operative_notes_cpb_m: operativeNotesCPBm,
            operative_notes_xc_h: operativeNotesXCh,
            operative_notes_xc_m: operativeNotesXCm,
            operative_notes_ca_h: operativeNotesCAh,
            operative_notes_ca_m: operativeNotesCAm,
            my_role: myRole,
            post_operative_course: postOperativeCourse,
            learning_points_key_lessons: learningPointsKeyLessons,
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
