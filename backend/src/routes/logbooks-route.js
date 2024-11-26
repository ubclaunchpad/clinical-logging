import express from "express";
import auth from "../middlewares/auth.js";
import { createLogbook, getUserLogbooks, getLogbook, createLog, getLogbookLogs, getLog } from "../services/logbooks-service.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
    const logbook = await createLogbook(req);
    res.status(201).json({ data: logbook });
});

router.get("/", auth, async (req, res) => {
    const userLogbooks = await getUserLogbooks(req);
    res.status(200).json({ data: userLogbooks });
});

router.get("/:logbookID", auth, async (req, res) => {
    const logbook = await getLogbook(req);
    res.status(200).json({ data: logbook });
});

router.post("/:logbookID/logs", auth, async (req, res) => {
    const log = await createLog(req);
    res.status(201).json({ data: log });
});

router.get("/:logbookID/logs/", auth, async (req, res) => {
    const logbookLogs = await getLogbookLogs(req);
    res.status(200).json({ data: logbookLogs });
});

router.get("/:logbookID/logs/:logID", auth, async (req, res) => {
    const log = await getLog(req);
    res.status(200).json({ data: log });
});

export default router;
