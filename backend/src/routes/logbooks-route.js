import express from "express";
import auth from "../middlewares/auth.js";
import { createLogbook, getUserLogbooks, getLogbook, createLog, getLogbookLogs, getLog, exportLogbookLogs } from "../services/logbooks-service.js";

const router = express.Router();

router.post("", auth, async (req, res) => {
    const logbook = await createLogbook(req);
    if (logbook.error) {
        res.status(500).json({ error: logbook.error });
    } else {
        res.status(201).json({ data: logbook });
    }
});

router.get("", auth, async (req, res) => {
    const userLogbooks = await getUserLogbooks(req);
    if (userLogbooks.error) {
        res.status(500).json({ error: userLogbooks.error });
    } else {
        res.status(200).json({ data: userLogbooks });
    }
});

router.get("/:logbookID", auth, async (req, res) => {
    const logbook = await getLogbook(req);
    if (logbook.error) {
        res.status(500).json({ error: logbook.error });
    } else {
        res.status(200).json({ data: logbook });
    }
});

router.post("/:logbookID/logs", auth, async (req, res) => {
    const log = await createLog(req);
    if (log.error) {
        res.status(500).json({ error: log.error });
    } else {
        res.status(201).json({ data: log });
    }
});

router.get("/:logbookID/logs", auth, async (req, res) => {
    const logbookLogs = await getLogbookLogs(req);
    if (logbookLogs.error) {
        res.status(500).json({ error: logbookLogs.error });
    } else {
        res.status(200).json({ data: logbookLogs });
    }
});

router.get("/:logbookID/logs/export", auth, async(req, res) => {
    const csvFile = await exportLogbookLogs(req);
    if (csvFile.error) {
        res.status(500).json({ error: csvFile.error });
    } else {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="logs.csv"');
        res.status(200).send(csvFile);
    }
});

router.get("/:logbookID/logs/:logID", auth, async (req, res) => {
    const log = await getLog(req);
    if (log.error) {
        res.status(500).json({ error: log.error });
    } else {
        res.status(200).json({ data: log });
    }
});


export default router;