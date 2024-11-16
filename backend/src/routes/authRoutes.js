import express from "express";
import auth from "../middlewares/auth.js";

const router = express.Router();

//auth test
router.post("/check", auth, async (req, res) => {
    res.json({ message: "Auth Check Ok"});
})

export default router;