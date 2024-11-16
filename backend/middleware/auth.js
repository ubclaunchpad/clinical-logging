import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization")?.split(" ")[1];
		const supabaseSecret = process.env.SUPABASE_JWT_SECRET;

		if (token) {
			jwt.verify(token, supabaseSecret);
		} else {
			res.status(401).json({ msg: "No token: Authentication Denied" });
		}

		next();
	} catch {
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
