import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import logRoutes from "./routes/logRoutes.js";

dotenv.config();

const corsOptions = {
    origin: ["http://localhost:5173"],
};
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/log', logRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

