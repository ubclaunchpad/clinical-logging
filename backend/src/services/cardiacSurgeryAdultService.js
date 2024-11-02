import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function insertTable(req, res) {
    //get id
    const token = req.header("Authorization")?.split(" ")[1];
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);
    const id = decodedToken["user_metadata"]["sub"]
    console.log(req.body);
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
        .insert({
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
            social: social });

    if (error) {
        console.log(error);
        throw error; 
    }
}

export default insertTable;

