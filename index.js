import express from "express";
import cors from "cors";
import root from "./app/index.js";
import cookieParser from "cookie-parser";
import { client_url } from "./constants/client.js";
import deleteTables from "./temp/deleteTables.js";
import admin from "./admin/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({ origin: client_url, credentials: true }));
app.use(express.json());

app.use("", root);
app.use("", deleteTables);
app.use("", admin);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
