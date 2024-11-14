import express from "express";
import auth from "../middlewares/auth.js";
import insertTable from "../services/cardiacSurgeryAdultService.js"

const router = express.Router();

router.post("/cardiacSurgeryAdultService", auth, async (req, res) => {
    try {
        const result = await insertTable(req, res);
        res.json(result);
    } catch(error) {
        console.error("Caught Error:", error.message);
        res.status(500).json({message: error.message});
    }
})

export default router;