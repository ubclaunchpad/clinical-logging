import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createUser(token, firstName, lastName, res) {
    try {
        const decodedToken = jwt.decode(token);
        const id = decodedToken["user_metadata"]["sub"]
        const error = await supabase.from("User").insert({ id: id, first_name: firstName, last_name: lastName });
        if (error) {
            throw new Error(error["error"]["message"]); 
        }
        res.json({ message: "sucesfully created user: " + id });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export default createUser;