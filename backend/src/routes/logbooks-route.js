import express from "express";
import auth from "../middlewares/auth.js";
import { createLogbook, getUserLogbooks, getLogbook, createLog } from "../services/logbooks-service.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
    const logbook = await createLogbook(req);
    res.status(201).json({ data: logbook });
});

router.get("/", auth, async (req, res) => {
    const logbooks = await getUserLogbooks(req);
    res.status(200).json({ data: logbooks });
});

router.get("/:id", auth, async (req, res) => {
    const logbook = await getLogbook(req);
    res.status(200).json({ data: logbook });
});

router.post("/logs", auth, async (req, res) => {
    const log = await createLog(req);
    res.status(201).json({ data: log });
});

export default router;