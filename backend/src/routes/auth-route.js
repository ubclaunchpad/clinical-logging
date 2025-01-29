import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const router = express.Router();
const supabase = createClient(supabaseUrl, supabaseKey);

// remove for production 
router.post("/token", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new Error("Email is missing"); 
        }
        if (!password) {
            throw new Error("Password is missing"); 
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            throw new Error(error.message); 
        }
        res.json({ data: data.session.access_token }) 
    } catch (error) {
        res.json({ error: error.message }) 
    }
})

export default router;