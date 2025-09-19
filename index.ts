import express from "express";
import cors from "cors";
import root from "./app";

const app = express();
app.use(cors({ origin: "https://vehsf.com", credentials: true }));
app.use(express.json());

app.use("", root);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
