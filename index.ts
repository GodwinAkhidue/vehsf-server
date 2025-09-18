import express from "express";
import cors from "cors";
import root from "./app";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("", root);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
