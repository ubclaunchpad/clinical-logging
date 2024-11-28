import express from "express";
import auth from "../middlewares/auth.js";
import insertTable from "../services/cardiacSurgeryAdultService.js";
import axios from "axios";
import FormData from "form-data";

const router = express.Router();

router.post("/cardiacSurgeryAdultService", auth, async (req, res) => {
  try {
    const result = await insertTable(req, res);
    res.json(result);
  } catch (error) {
    console.error("Caught Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/transcriptions", auth, async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const imageFile = req.files.image;
    const formData = new FormData();
    formData.append("image", imageFile.data, imageFile.name);

    const response = await axios.post(
      "http://localhost:5000/transcribe",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Caught Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
