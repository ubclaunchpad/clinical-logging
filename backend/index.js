import express from "express";
import cors from "cors";
import auth from "./middleware/auth.js";
import dotenv from 'dotenv';

dotenv.config();

const corsOptions = {
    origin: ["http://localhost:5173"],
};
const app = express();

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.post("/check", auth, async (req, res) => {
  res.json({ message: "Hello from server but logged in"});
})