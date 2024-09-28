import express from "express";
import cors from "cors";
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