import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./src/routes/auth-route.js";
import logRoutes from "./src/routes/logbooks-route.js";

dotenv.config();

const corsOptions = {
    origin: ["http://localhost:5173"],
};
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/logbooks', logRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

