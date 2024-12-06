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
    // const keyFile = req.files.keys; // TODO: implement ability to send key file
    const formData = new FormData();
    formData.append("image", imageFile.data, imageFile.name);

    const response = await axios.post(
      "http://127.0.0.1:5000/transcribe", //TODO: change this endpoint after deploying
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
