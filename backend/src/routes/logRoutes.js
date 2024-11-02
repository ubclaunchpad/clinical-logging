import express from "express";
import auth from "../middlewares/auth.js";
import insertTable from "../services/cardiacSurgeryAdultService.js"

const router = express.Router();

router.post("/cardiacSurgeryAdultService", auth, async (req, res) => {
    try {
        await insertTable(req, res);
        res.json({ message: "log successful"});
    } catch(error) {
        res.json(error.message);
    }
})

export default router;