import axios from "axios";
import FormData from "form-data";
import express from "express";
import auth from "../middlewares/auth.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();

// Set up storage directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../../uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Store image and return its path
const storeImage = async (imageFile, userId) => {
  const timestamp = Date.now();
  const filename = `${userId}_${timestamp}_${imageFile.name}`;
  const filepath = path.join(uploadDir, filename);
  
  await fs.promises.writeFile(filepath, imageFile.data);
  return filename;
};

router.post("/", auth, async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const imageFile = req.files.image;
    const userId = req.user.id;

    // Store the image
    const storedFilename = await storeImage(imageFile, userId);

    // Prepare form data for transcription
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

    // res.json(response.data);

    // Return both response data and image data
    res.json({
      ...response.data,
      imageFile: storedFilename
    });
  } catch (error) {
    console.error("Caught Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to retrieve stored image
router.get("/:filename", auth, async (req, res) => {
  try {
    const filepath = path.join(uploadDir, req.params.filename);
    
    // Check if file exists
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: "Image not found" });
    }

    
    // const userId = req.user.id;
    // if (!req.params.filename.startsWith(userId + "_")) {
    //   return res.status(403).json({ error: "Unauthorized access" });
    // }

    res.sendFile(filepath);
  } catch (error) {
    console.error("Error retrieving image:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
