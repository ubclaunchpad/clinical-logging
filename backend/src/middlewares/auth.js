import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization")?.split(" ")[1];
		const supabaseSecret = process.env.SUPABASE_JWT_SECRET;
		if (token) {
			jwt.verify(token, supabaseSecret);
			const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
				global: {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			})
			req.supabase = supabase;
		} else {
			res.status(401).json({ msg: "No token: Authentication Denied" });
		}
		next();
	} catch (err) {
		return res.status(400).json({
			msg: {
				token: req.header("Authorization")?.split(" ")[1],
				secret: process.env.SUPABASE_JWT_SECRET,
			},
			error: "Invalid token, authentication denied.",
		});
	}
};

export default auth;

