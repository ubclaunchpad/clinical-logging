import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import logRoutes from "./src/routes/logRoutes.js";
import transcriptionRoutes from "./src/routes/transcriptionRoutes.js";
import fileUpload from "express-fileupload";

dotenv.config();

const corsOptions = {
  origin: ["http://localhost:5173"],
};
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/log", logRoutes);
app.use("/api/transcriptions", transcriptionRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
