import express from "express";
import cors from "cors";
import root from "./app/index.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors({ origin: "https://vehsf.vercel.app", credentials: true }));
app.use(express.json());

app.use("", root);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
