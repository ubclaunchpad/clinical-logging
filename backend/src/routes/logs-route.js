import express from "express";
import auth from "../middlewares/auth.js";
import { getUserLogs } from "../services/logs-service.js";

const router = express.Router();

router.get("", auth, async (req, res) => {
    const userLogs = await getUserLogs(req);
    if (userLogs.error) {
        res.status(500).json({ error: userLogs.error });
    } else {
        res.status(200).json({ data: userLogs });
    }
})

export default router;