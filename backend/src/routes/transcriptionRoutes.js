import axios from "axios";
import FormData from "form-data";
import express from "express";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
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
