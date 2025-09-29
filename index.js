import express from "express";
import cors from "cors";
import root from "./app/index.js";
import cookieParser from "cookie-parser";
import { client_url } from "./constants/client.js";
import deleteTables from "./temp/deleteTables.js";

const app = express();
app.use(cookieParser());
app.use(cors({ origin: client_url, credentials: true }));
app.use(express.json());

app.use("", root);
app.use("", deleteTables);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
