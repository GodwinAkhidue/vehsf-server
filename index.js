import express from "express";
import cors from "cors";
import root from "./app/index.js";
import cookieParser from "cookie-parser";
import admin from "./admin/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cookieParser());

const allowedOrigins = [
  "https://www.vehsf.com",
  "https://admin.vehsf.com",
  "https://vehsf.com",
  "http://localhost:3000",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("", root);
app.use("", admin);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
