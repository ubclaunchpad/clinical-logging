import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import auth from "./middlewares/auth.js";
import createUser from "./services/createUser.js";

dotenv.config();

const corsOptions = {
    origin: ["http://localhost:5173"],
};
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());

app.post("/user", auth, async (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    const { firstName, lastName } = req.body;
    createUser(token, firstName, lastName, res);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
